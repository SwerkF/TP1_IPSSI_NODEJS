-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 04 jan. 2024 à 10:50
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `technologie`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `id` int(11) NOT NULL,
  `commentaire` longtext DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `technologie_id` int(11) NOT NULL,
  `is_visible` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id`, `commentaire`, `date_creation`, `utilisateur_id`, `technologie_id`, `is_visible`) VALUES
(1, 'ERZGEZRGREGERG', '2024-01-02 16:33:29', 1, 1, 1),
(3, 'ergergergergergerg', '2023-01-01 00:00:00', 1, 1, 1),
(11, 'efe', '2024-01-03 15:58:06', 7, 10, 1),
(12, 'f', '2024-01-03 15:58:49', 8, 10, 1),
(13, 'pîoj', '2024-01-03 16:15:41', 7, 1, 1),
(14, 'pôij\n', '2024-01-03 16:15:46', 7, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom`) VALUES
(1, 'User'),
(2, 'Journaliste'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Structure de la table `technologie`
--

CREATE TABLE `technologie` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `date_creation` date NOT NULL DEFAULT current_timestamp(),
  `createur` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `technologie`
--

INSERT INTO `technologie` (`id`, `nom`, `date_creation`, `createur`) VALUES
(1, 'AMD', '2024-01-03', 'Sa'),
(10, 'Skweres', '2024-01-05', 'ef');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `motdepasse` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `motdepasse`, `token`, `role_id`) VALUES
(1, 'Swerk', 'Oliwer', 'swerk', '$2b$10$QXB8txORUiW1pZ9nlUdnye5p2ivYMCVKQkqCsjQ/YBoDT0E.V24GO', '', 1),
(3, 'Swerk', 'Oliwer', 'oliwer', '$2b$10$JqU42adl6GxObBD./s6sN.AG07vwe47bJgrfxf71XCAKfK.YnuhBq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcwNDI3MDYzMywiZXhwIjoxNzA0MjcwNzUzfQ.u-1DCXduMvQnNZi4WmFMNSkwsnDTI0eBT6bSfZ82hJ8', 1),
(6, 'SS', 'SS', 'ef@f.com', '$2b$10$BKeUo4AFIptDMhbgUL2Qeu/pAS0UrdlelhHl0iTznbO3aTYuccjfy', '', 1),
(7, 'ADMIN', 'ADMIN', 'admin', '$2b$10$wrIzUiJi0qyhGBZbDfjm9uGk5v9B8KzcXGAKLda7vdO0AYCURZEeC', '', 3),
(8, 'journaliste', 'journaliste', 'journaliste', '$2b$10$w4mAGH5p5KxDI1Rk3f0Gveq3D280eRWttXNVZtbdiOs.cgdHE3Qv.', '', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_commentaire_utilisateur_idx` (`utilisateur_id`),
  ADD KEY `fk_commentaire_technologie1_idx` (`technologie_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `technologie`
--
ALTER TABLE `technologie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `technologie`
--
ALTER TABLE `technologie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `fk_commentaire_technologie1` FOREIGN KEY (`technologie_id`) REFERENCES `technologie` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_commentaire_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
