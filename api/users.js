import bcrypt from "bcryptjs";

// Données initiales pour les utilisateurs
let users = [
    { id: "alexane.diezrannou", name: "Alexane Diez Rannou", calls: 0, callsReached: 0, pq: 0, password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "anna.nguyen", name: "Anna Nguyen", calls: 0, callsReached: 0, pq: 0, password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "anne.chevreux", name: "Anne Chevreux", calls: 0, callsReached: 0, pq: 0, password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "carla.berlinches", name: "Carla Berlinches", calls: 0, callsReached: 0, pq: 0, password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "chloe.anselme", name: "Chloe Anselme", calls: 0, callsReached: 0, pq: 0, password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
];

// Administrateurs
let admins = [
    { id: "admin1", password: bcrypt.hashSync("admin123", 10) },
    { id: "admin2", password: bcrypt.hashSync("admin123", 10) },
];

export default function handler(req, res) {
    const { id, password, calls, callsReached, pq, newPassword, action, userId } = req.body || {};

    if (req.method === "POST") {
        // Authentification des administrateurs
        const admin = admins.find((a) => a.id === id);
        if (admin && bcrypt.compareSync(password, admin.password)) {
            if (action === "resetPassword") {
                const user = users.find((u) => u.id === userId);
                if (user) {
                    user.password = bcrypt.hashSync("default123", 10);
                    user.mustChangePassword = true;
                    return res.status(200).json({ message: `Password reset for ${user.name}.` });
                } else {
                    return res.status(404).json({ message: "User not found." });
                }
            } else if (action === "viewAllUsers") {
                return res.status(200).json(users.map((u) => ({ id: u.id, name: u.name, calls: u.calls, callsReached: u.callsReached, pq: u.pq })));
            } else {
                return res.status(200).json({ message: "Admin authenticated." });
            }
        }

        // Authentification des utilisateurs
        const user = users.find((u) => u.id === id);
        if (user && bcrypt.compareSync(password, user.password)) {
            if (user.mustChangePassword) {
                if (newPassword) {
                    user.password = bcrypt.hashSync(newPassword, 10);
                    user.mustChangePassword = false;
                    return res.status(200).json({ message: "Password updated successfully." });
                } else {
                    return res.status(400).json({ message: "New password required." });
                }
            } else {
                if (calls !== undefined && callsReached !== undefined && pq !== undefined) {
                    user.calls = calls;
                    user.callsReached = callsReached;
                    user.pq = pq;
                    return res.status(200).json({ message: "Stats updated successfully.", user });
                } else {
                    return res.status(200).json({ message: "Authenticated", name: user.name });
                }
            }
        }

        // Identifiants invalides
        return res.status(401).json({ message: "Invalid credentials." });

    } else if (req.method === "GET") {
        return res.status(200).json(users.map((u) => ({ id: u.id, name: u.name, calls: u.calls, callsReached: u.callsReached, pq: u.pq })));
    } else {
        return res.status(405).json({ message: "Method not allowed." });
    }
}
