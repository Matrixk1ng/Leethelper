import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const useUserTopics = () => {
    const [topics, setTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user) {
                console.log("User not signed in");
                setTopics([]);
                setLoading(false);
                return;
            }
            
            const docRef = doc(db, "users", user.uid);
            const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const preferences = data.preferences || [];
                    setTopics(preferences);
                } else {
                    setTopics([]);
                }
                setLoading(false);
            }, (error) => {
                console.error("Error listening to topics:", error);
                setLoading(false);
            });

            // Unsubscribe from onSnapshot when user changes
            return () => unsubscribeSnapshot();
        });

        return () => unsubscribeAuth();
    }, []);

    return {topics, loading};
};
