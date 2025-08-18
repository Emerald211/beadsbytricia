import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    User, 
    updateProfile,
    signOut
} from "firebase/auth";
import { 
    doc, 
    getDoc, 
    getFirestore, 
    setDoc 
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { app, firestore } from '../firebaseConfig';

const auth = getAuth(app);
export const db = getFirestore(app);


export const customOnAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

export const CreateNewAdminUser = async (email: string, password: string) => {
    if (!email || !password) return null;

    try {
      
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
     
        if (error instanceof FirebaseError) {
            if (error.code === "auth/email-already-in-use") {
                
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    return userCredential.user;
                } catch (signInError: unknown) {
                    if (signInError instanceof FirebaseError) {
                        console.error("Error signing in with existing email and password:", signInError);

                        if (signInError.message === "Firebase: Error (auth/invalid-credential).") {
                            return "Incorrect Password"
                        } 
                        return signInError.message; 
                    } else {
                        console.error("Unknown error during sign-in:", signInError);
                        
                        return "Unknown error during sign-in";
                    }
                }
            } else {
             
                console.error("Error creating user:", error.message);

                if (error.message === "Firebase: Error (auth/network-request-failed).") {
                    return "Network too bad, try again"
                }
                return error.message;
            }
        }
        return "An unknown error occurred";
    }
};


export const createAdminUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation: Record<string, unknown> = {}
) => {
    try {
        const userDocRef = doc(db, "admins", userAuth.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const {  email } = userAuth;
            const createdAt = new Date();

            const generateDisplayName = () => {
                const userEmail = email;

                const getNameFromEmail = userEmail?.slice(0, 5).toLowerCase();
                const randomNum = Math.floor(100 + Math.random() * 900);

                const newDisplayName = `${getNameFromEmail}${randomNum}`;

                return newDisplayName;
            };

            const newDisplayName = generateDisplayName()

            await updateProfile(userAuth, {displayName : newDisplayName})

            await setDoc(userDocRef, {
                displayName: newDisplayName,
                email,
                createdAt,
                ...additionalInformation,
            });

            console.log("AdminUser document created successfully");
        }

        return userDocRef;
    } catch (error) {
        console.error("Error creating the AdminUser", (error as Error).message);
        throw error;
    }
};

export const CreateNewUser = async (email: string, password: string) => {
    if (!email || !password) return null;

    try {
      
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: unknown) {
     
        if (error instanceof FirebaseError) {
            if (error.code === "auth/email-already-in-use") {
                
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    return userCredential.user;
                } catch (signInError: unknown) {
                    if (signInError instanceof FirebaseError) {
                        console.error("Error signing in with existing email and password:", signInError);

                        if (signInError.message === "Firebase: Error (auth/invalid-credential).") {
                            return "Incorrect Password"
                        } 
                        return signInError.message; 
                    } else {
                        console.error("Unknown error during sign-in:", signInError);
                        
                        return "Unknown error during sign-in";
                    }
                }
            } else {
             
                console.error("Error creating user:", error.message);

                if (error.message === "Firebase: Error (auth/network-request-failed).") {
                    return "Network too bad, try again"
                }
                return error.message;
            }
        }
        return "An unknown error occurred";
    }
};

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation: Record<string, unknown> = {}
) => {
    try {
        const isAdmin = await isAdminUser(userAuth.uid);

        if (isAdmin) {
            console.log('User is an admin. No user document will be created.');
            return null; 
        }

        const userDocRef = doc(getFirestore(), "users", userAuth.uid);

        const { email } = userAuth;
        const createdAt = new Date();

        // Function to generate a display name
        const generateDisplayName = () => {
            const userEmail = email;
            const getNameFromEmail = userEmail?.slice(0, 5).toLowerCase();
            const randomNum = Math.floor(100 + Math.random() * 900);
            return `${getNameFromEmail}${randomNum}`;
        };

        const newDisplayName = generateDisplayName();

        // Update profile with new display name
        await updateProfile(userAuth, { displayName: newDisplayName }).catch((error) => {
            console.error("Error updating user profile:", error);
        });

        // Set/merge the document (whether or not it exists)
        await setDoc(userDocRef, {
            displayName: newDisplayName,
            email,
            createdAt,
            ...additionalInformation,
        }, { merge: true }); // Ensures no overwriting of existing fields

        console.log("User document created/updated successfully");

        return userDocRef;
    } catch (error) {
        console.error("Error creating the user", (error as Error).message);
        throw error;
    }
};


export const isAdminUser = async (uid: string): Promise<boolean> => {
    const adminDocRef = doc(getFirestore(), 'admins', uid);
    const adminDocSnap = await getDoc(adminDocRef);
    console.log(`Admin doc exists for UID ${uid}: ${adminDocSnap.exists()}`);
    return adminDocSnap.exists(); 
};

  export const logOutAdmin = async (user: User | null) => {
    if (user) {
      const isAdmin = await isAdminUser(user.uid); 
  
      if (isAdmin) {
        try {
          await signOut(auth); 
          console.log('Admin user signed out successfully.');
        } catch (error) {
          console.error('Error signing out admin: ', error);
        }
      } else {
        console.log('User is not an admin, cannot log out.');
      }
    } else {
      console.log('No user is signed in.');
    }
  };


 export const fetchUserById = async (userId: string) => {
    try {
        const userDocRef = doc(firestore, "users", userId);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          const data = userDoc.data();
          return {
            displayName: data.firstName,
            email: data.email,
              id: userDoc.id,
            phoneNo: data.phoneNo
          };
        } else {
          console.log("No such user document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
        return null;
      }
 };

 export const logOutUser = async (user: User | null) => {
    if (user) {
      const isAdmin = await isAdminUser(user.uid); 
  
      if (!isAdmin) {
        try {
          await signOut(auth); 
          console.log(' user signed out successfully.');
        } catch (error) {
          console.error('Error signing out user: ', error);
        }
      } else {
        console.log('User is an admin, cannot log out.');
      }
    } else {
      console.log('No user is signed in.');
    }
  };

 

