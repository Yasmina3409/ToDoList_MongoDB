module.exports.Logout = async (req, res) => {
    const token = req.headers.authorization;

    // Ajouter le token à la liste noire
    if (token) {
        revokedTokens.push(token);
    }

    res.sendStatus(204); // Réponse sans contenu (OK)
    // req.session.destroy(err => {
    //     if (err) {
    //         console.error('Erreur lors de la déconnexion :', err);
    //         res.status(500).send('Erreur lors de la déconnexion.');
    //     } else {
    //         res.status(200).send('Déconnexion réussie.');

    //     }
    // });


}



