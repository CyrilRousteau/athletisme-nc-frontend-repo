
const Joueur = require('../models/Joueur');

const createJoueur = async (joueurData) => {
    try {
        const joueur = await Joueur.create(joueurData);
        return joueur;
    } catch (error) {
        throw new Error('Erreur lors de la création du joueur : ' + error.message);
    }
};

const getJoueurById = async (id) => {
    try {
        const joueur = await Joueur.findByPk(id);
        if (!joueur) {
            throw new Error('Joueur non trouvé');
        }
        return joueur;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du joueur : ' + error.message);
    }
};

const getAllJoueurs = async () => {
    try {
        const joueurs = await Joueur.findAll();
        return joueurs;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des joueurs : ' + error.message);
    }
};

const updateJoueur = async (id, joueurData) => {
    try {
        const joueur = await Joueur.findByPk(id);
        if (!joueur) {
            throw new Error('Joueur non trouvé');
        }
        await joueur.update(joueurData);
        return joueur;
    } catch (error) {
        throw new Error('Erreur lors de la mise à jour du joueur : ' + error.message);
    }
};

const deleteJoueur = async (id) => {
    try {
        const joueur = await Joueur.findByPk(id);
        if (!joueur) {
            throw new Error('Joueur non trouvé');
        }
        await joueur.destroy();
    } catch (error) {
        throw new Error('Erreur lors de la suppression du joueur : ' + error.message);
    }
};

module.exports = {
    createJoueur,
    getJoueurById,
    getAllJoueurs,
    updateJoueur,
    deleteJoueur
};
