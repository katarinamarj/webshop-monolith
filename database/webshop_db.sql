-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webshop_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kategorija`
--

DROP TABLE IF EXISTS `kategorija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategorija` (
  `kategorija_id` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(100) NOT NULL,
  PRIMARY KEY (`kategorija_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `korisnik_id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `lozinka` varchar(255) NOT NULL,
  `uloga` enum('korisnik','admin') NOT NULL,
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `korpa`
--

DROP TABLE IF EXISTS `korpa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korpa` (
  `korpa_id` int NOT NULL AUTO_INCREMENT,
  `korisnik_id` int NOT NULL,
  PRIMARY KEY (`korpa_id`),
  UNIQUE KEY `korisnik_id` (`korisnik_id`),
  CONSTRAINT `korpa_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `placanje`
--

DROP TABLE IF EXISTS `placanje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placanje` (
  `placanje_id` int NOT NULL AUTO_INCREMENT,
  `datum` datetime NOT NULL,
  `status` enum('uspesno','neuspesno') NOT NULL,
  `iznos` decimal(10,2) NOT NULL,
  `porudzbina_id` int NOT NULL,
  PRIMARY KEY (`placanje_id`),
  UNIQUE KEY `porudzbina_id` (`porudzbina_id`),
  CONSTRAINT `placanje_ibfk_1` FOREIGN KEY (`porudzbina_id`) REFERENCES `porudzbina` (`porudzbina_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `podacizaisporuku`
--

DROP TABLE IF EXISTS `podacizaisporuku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `podacizaisporuku` (
  `podaci_za_isporuku_id` int NOT NULL AUTO_INCREMENT,
  `ulica` varchar(255) NOT NULL,
  `grad` varchar(100) NOT NULL,
  `postanski_broj` varchar(20) NOT NULL,
  `telefon` varchar(30) NOT NULL,
  PRIMARY KEY (`podaci_za_isporuku_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `porudzbina`
--

DROP TABLE IF EXISTS `porudzbina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `porudzbina` (
  `porudzbina_id` int NOT NULL AUTO_INCREMENT,
  `datum` datetime NOT NULL,
  `status` enum('kreirana','placena','otkazana','u obradi','poslata','isporucena') NOT NULL,
  `ukupan_iznos` decimal(10,2) NOT NULL,
  `korisnik_id` int NOT NULL,
  `podaci_za_isporuku_id` int NOT NULL,
  PRIMARY KEY (`porudzbina_id`),
  KEY `korisnik_id` (`korisnik_id`),
  KEY `podaci_za_isporuku_id` (`podaci_za_isporuku_id`),
  CONSTRAINT `porudzbina_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`),
  CONSTRAINT `porudzbina_ibfk_2` FOREIGN KEY (`podaci_za_isporuku_id`) REFERENCES `podacizaisporuku` (`podaci_za_isporuku_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proizvod`
--

DROP TABLE IF EXISTS `proizvod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proizvod` (
  `sifra` varchar(50) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `opis` text,
  `cena` decimal(10,2) NOT NULL,
  `dostupna_kolicina` int NOT NULL,
  `kategorija_id` int NOT NULL,
  `slika` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sifra`),
  KEY `kategorija_id` (`kategorija_id`),
  CONSTRAINT `proizvod_ibfk_1` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`kategorija_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken` (
  `refresh_token_id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(500) NOT NULL,
  `datum_isteka` datetime NOT NULL,
  `korisnik_id` int NOT NULL,
  PRIMARY KEY (`refresh_token_id`),
  UNIQUE KEY `token` (`token`),
  KEY `korisnik_id` (`korisnik_id`),
  CONSTRAINT `refreshtoken_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stavka_korpe`
--

DROP TABLE IF EXISTS `stavka_korpe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stavka_korpe` (
  `stavka_korpe_id` int NOT NULL AUTO_INCREMENT,
  `korpa_id` int NOT NULL,
  `proizvod_sifra` varchar(50) NOT NULL,
  `kolicina` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`stavka_korpe_id`,`korpa_id`),
  KEY `korpa_id` (`korpa_id`),
  KEY `proizvod_sifra` (`proizvod_sifra`),
  CONSTRAINT `stavka_korpe_ibfk_1` FOREIGN KEY (`korpa_id`) REFERENCES `korpa` (`korpa_id`) ON DELETE CASCADE,
  CONSTRAINT `stavka_korpe_ibfk_2` FOREIGN KEY (`proizvod_sifra`) REFERENCES `proizvod` (`sifra`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stavkaporudzbine`
--

DROP TABLE IF EXISTS `stavkaporudzbine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stavkaporudzbine` (
  `stavka_porudzbine_id` int NOT NULL AUTO_INCREMENT,
  `porudzbina_id` int NOT NULL,
  `kolicina` int NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `sifraProizvoda` varchar(50) NOT NULL,
  PRIMARY KEY (`stavka_porudzbine_id`,`porudzbina_id`),
  KEY `porudzbina_id` (`porudzbina_id`),
  KEY `sifraProizvoda` (`sifraProizvoda`),
  CONSTRAINT `stavkaporudzbine_ibfk_1` FOREIGN KEY (`porudzbina_id`) REFERENCES `porudzbina` (`porudzbina_id`) ON DELETE CASCADE,
  CONSTRAINT `stavkaporudzbine_ibfk_2` FOREIGN KEY (`sifraProizvoda`) REFERENCES `proizvod` (`sifra`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-06 16:13:27
