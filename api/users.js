import bcrypt from "bcryptjs";

// Données des utilisateurs
let users = [
    { id: "alexane.diezrannou", name: "Alexane Diez Rannou", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "anna.nguyen", name: "Anna Nguyen", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "anne.chevreux", name: "Anne Chevreux", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "carla.berlinches", name: "Carla Berlinches", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "chloe.anselme", name: "Chloe Anselme", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "emma.brault", name: "Emma Brault", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "guilhem.coulon", name: "Guilhem Coulon", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "ines.darhi", name: "Ines Darhi", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "kathia.corrales", name: "Kathia Corrales", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "leo.jaffrain", name: "Leo Jaffrain", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "leonie.groebmueller", name: "Leonie Groebmueller", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "leopaul.cazaudumec", name: "LeoPaul Cazaudumec", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "maialen.roucheyrolle", name: "Maialen Roucheyrolle", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "manon.gascogne", name: "Manon Gascogne", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "marie.leger", name: "Marie Leger", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "martin.vandenheede", name: "Martin Vandenheede", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "miriana.migliozzi", name: "Miriana Migliozzi", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
    { id: "raphael.rigault", name: "Raphael Rigault", password: bcrypt.hashSync("default123", 10), mustChangePassword: true },
];

// Données des administrateurs
let admins = [
    { id: "admin1", password: bcrypt.hashSync("admin123", 10) },
    { id: "admin2", password: bcrypt.hashSync("admin123", 10) },
];

export default function handler(req, res) {
    const { id, password, newPassword } = req.body || {};

    if (req.method === "POST") {
        // Gestion des administrateurs
        const admin = admins.find((a) => a.id === id);
        if (admin && bcrypt.compareSync(password, admin.password)) {
            return res.status(200).json({ message: "Admin authenticated." });
        }

        // Gestion des utilisateurs normaux
        const user = users.find((u) => u.id === id);
        if (user) {
            if (user.mustChangePassword && newPassword) {
                // Mise à jour du mot de passe
                user.password = bcrypt.hashSync(newPassword, 10);
                user.mustChangePassword = false;
                return res.status(200).json({ message: "Password updated successfully." });
            }

            if (bcrypt.compareSync(password, user.password)) {
                if (user.mustChangePassword) {
                    return res.status(200).json({ message: "New password required." });
                }

                return res.status(200).json({ message: "Authenticated", name: user.name });
            }
        }

        return res.status(401).json({ message: "Invalid credentials." });
    } else {
        return res.status(405).json({ message: "Method not allowed." });
    }
}
