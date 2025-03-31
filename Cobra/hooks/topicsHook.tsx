import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const useUserTopics = () => {
    const [topics, setTopics] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log("User not signed in");
                setTopics([]);
                return;
            }

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const preferences = data.preferences || [];
                setTopics(preferences);
            } else {
                setTopics([]);
            }
        });

        // Don't forget to unsubscribe on unmount
        return () => unsubscribe();
    }, []);
    return topics;
};
