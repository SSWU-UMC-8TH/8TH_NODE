-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: umc_node
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `food_category`
--

DROP TABLE IF EXISTS `food_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(15) DEFAULT NULL,
  `Column4` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_category`
--

LOCK TABLES `food_category` WRITE;
/*!40000 ALTER TABLE `food_category` DISABLE KEYS */;
INSERT INTO `food_category` VALUES (1,'한식',NULL),(2,'중식',NULL),(3,'일식',NULL),(4,'양식',NULL),(5,'디저트',NULL);
/*!40000 ALTER TABLE `food_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mission`
--

DROP TABLE IF EXISTS `mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `store_id` bigint DEFAULT NULL,
  `reward` int DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `mission_spec` text,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `mission_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mission`
--

LOCK TABLES `mission` WRITE;
/*!40000 ALTER TABLE `mission` DISABLE KEYS */;
INSERT INTO `mission` VALUES (1,2,500,'2025-05-10 23:59:59','홍콩반점에서 12000원 이상의 식사를 하세요!',NULL,NULL);
/*!40000 ALTER TABLE `mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'서울','2025-05-03 21:07:42.000000','2025-05-03 21:07:42.000000'),(2,'대전','2025-05-03 21:14:33.000000','2025-05-03 21:14:33.000000');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  `body` text,
  `score` float DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,4,'빵 종류가 엄청 많고, 가격이 싸요!',5,NULL);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_image`
--

DROP TABLE IF EXISTS `review_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `review_id` bigint DEFAULT NULL,
  `store_id` bigint DEFAULT NULL,
  `image_url` text,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `review_id` (`review_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `review_image_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`),
  CONSTRAINT `review_image_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_image`
--

LOCK TABLES `review_image` WRITE;
/*!40000 ALTER TABLE `review_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `region_id` bigint DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `score` float DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `store_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (2,1,'홍콩반점','서울시 관악구',NULL,NULL,NULL),(3,1,'아마스빈','서울시 양천구 ',NULL,NULL,NULL),(4,2,'성심당','대전 중구',NULL,NULL,NULL);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms`
--

DROP TABLE IF EXISTS `terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `body` text,
  `optional` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms`
--

LOCK TABLES `terms` WRITE;
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `spec_address` varchar(40) DEFAULT NULL,
  `phone_num` varchar(13) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `inactive_date` datetime(6) DEFAULT NULL,
  `social_type` varchar(10) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `point` int DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `detail_address` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'탱','여성',NULL,'주소1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'miseose65@naver.com',NULL,'2003-05-24','세부주소1','010-1234-1234'),(2,'탱','여성',NULL,'주소1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'miseoseo1@naver.com',NULL,'2003-05-24','세부주소1','010-1234-1234'),(3,'탱','여성',NULL,'주소1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'miseoseo12@naver.com',NULL,'2003-05-24','세부주소1','010-1234-1234'),(4,'탱','여성',NULL,'주소1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'miseoseo524@naver.com',NULL,'2003-05-24','세부주소1','010-1234-1234'),(5,'제리','여성',NULL,'주소1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jerry@example.com',NULL,'2025-03-08','세부주소1','010-1234-1234'),(6,'홍길동','남성',NULL,'서울시',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test@example.com',NULL,'2000-02-03','101호','010-1234-5678');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_agree`
--

DROP TABLE IF EXISTS `user_agree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_agree` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `terms_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `terms_id` (`terms_id`),
  CONSTRAINT `user_agree_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_agree_ibfk_2` FOREIGN KEY (`terms_id`) REFERENCES `terms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_agree`
--

LOCK TABLES `user_agree` WRITE;
/*!40000 ALTER TABLE `user_agree` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_agree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favor_category`
--

DROP TABLE IF EXISTS `user_favor_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favor_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `food_category_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `food_category_id` (`food_category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_favor_category_ibfk_1` FOREIGN KEY (`food_category_id`) REFERENCES `food_category` (`id`),
  CONSTRAINT `user_favor_category_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favor_category`
--

LOCK TABLES `user_favor_category` WRITE;
/*!40000 ALTER TABLE `user_favor_category` DISABLE KEYS */;
INSERT INTO `user_favor_category` VALUES (1,1,1,'2025-05-02 08:38:06','2025-05-02 08:38:06'),(2,2,1,'2025-05-02 08:38:06','2025-05-02 08:38:06'),(3,5,1,'2025-05-02 08:38:06','2025-05-02 08:38:06'),(4,1,2,'2025-05-03 04:06:21','2025-05-03 04:06:21'),(5,2,2,'2025-05-03 04:06:21','2025-05-03 04:06:21'),(6,5,2,'2025-05-03 04:06:21','2025-05-03 04:06:21'),(7,1,3,'2025-05-03 04:09:43','2025-05-03 04:09:43'),(8,2,3,'2025-05-03 04:09:43','2025-05-03 04:09:43'),(9,5,3,'2025-05-03 04:09:43','2025-05-03 04:09:43'),(10,1,4,'2025-05-03 04:10:57','2025-05-03 04:10:57'),(11,2,4,'2025-05-03 04:10:57','2025-05-03 04:10:57'),(12,5,4,'2025-05-03 04:10:57','2025-05-03 04:10:57'),(13,1,5,'2025-05-03 04:15:26','2025-05-03 04:15:26'),(14,2,5,'2025-05-03 04:15:26','2025-05-03 04:15:26'),(15,5,5,'2025-05-03 04:15:26','2025-05-03 04:15:26'),(16,1,6,'2025-05-03 04:21:40','2025-05-03 04:21:40'),(17,2,6,'2025-05-03 04:21:40','2025-05-03 04:21:40'),(18,3,6,'2025-05-03 04:21:40','2025-05-03 04:21:40');
/*!40000 ALTER TABLE `user_favor_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_mission`
--

DROP TABLE IF EXISTS `user_mission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_mission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `mission_id` bigint DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `mission_id` (`mission_id`),
  CONSTRAINT `user_mission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_mission_ibfk_2` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_mission`
--

LOCK TABLES `user_mission` WRITE;
/*!40000 ALTER TABLE `user_mission` DISABLE KEYS */;
INSERT INTO `user_mission` VALUES (1,1,1,'IN_PROGRESS',NULL,NULL);
/*!40000 ALTER TABLE `user_mission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_prefer`
--

DROP TABLE IF EXISTS `user_prefer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_prefer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `fk_userprefer_category` (`category_id`),
  CONSTRAINT `fk_userprefer_category` FOREIGN KEY (`category_id`) REFERENCES `food_category` (`id`),
  CONSTRAINT `user_prefer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_prefer`
--

LOCK TABLES `user_prefer` WRITE;
/*!40000 ALTER TABLE `user_prefer` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_prefer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-07 15:27:48
