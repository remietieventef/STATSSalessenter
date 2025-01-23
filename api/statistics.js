import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Récupérer les statistiques
        const statistics = await get('statistics');
        res.status(200).json(statistics || {});
    } else if (req.method === 'POST') {
        // Sauvegarder les statistiques
        const { staff, calls, callsReached, pq } = req.body;

        // Récupérer les statistiques actuelles
        const statistics = await get('statistics') || {};

        // Mettre à jour les statistiques pour le membre d'équipe
        statistics[staff] = { calls, callsReached, pq };

        // Sauvegarder les nouvelles statistiques
        await set('statistics', statistics);

        res.status(200).json({ message: 'Statistics updated', statistics });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
