-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: gconcesionario
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `backupBody`
--

DROP TABLE IF EXISTS `backupBody`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backupBody` (
  `id_body` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backupBody`
--

LOCK TABLES `backupBody` WRITE;
/*!40000 ALTER TABLE `backupBody` DISABLE KEYS */;
INSERT INTO `backupBody` VALUES
('BER','Berlina'),
('BMU','Bólido Muscle'),
('COM','Compacto'),
('CRO','Crossover'),
('DEP','Deportivo'),
('FAM','Familiar'),
('FUR','Furgoneta'),
('HBK','Hatchback'),
('LIM','Limusina'),
('MIC','Microcoche'),
('MON','Monovolumen');
/*!40000 ALTER TABLE `backupBody` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `body`
--

DROP TABLE IF EXISTS `body`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `body` (
  `id_body` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_body`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `body`
--

LOCK TABLES `body` WRITE;
/*!40000 ALTER TABLE `body` DISABLE KEYS */;
INSERT INTO `body` VALUES
('BER','Berlina'),
('BMU','Bólido Muscle'),
('COM','Compacto'),
('CRO','Crossover'),
('DEP','Deportivo'),
('FAM','Familiar'),
('FUR','Furgoneta'),
('HBK','Hatchback'),
('LIM','Limusina'),
('MIC','Microcoche'),
('MON','Monovolumen');
/*!40000 ALTER TABLE `body` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `id_brand` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_name` char(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_brand` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_brand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES
('AUD','AUDI','view/images/logos/audi.png'),
('BMW','BMW','view/images/logos/bmw.png'),
('CVR','CHEVROLET','view/images/logos/chevrolet.png'),
('FRD','FORD','view/images/logos/ford.png'),
('ITA','FIAT','view/images/logos/fiat.png'),
('MNI','MINI','view/images/logos/mini.png'),
('SAT','SEAT','view/images/logos/Seat_logo.png');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_imgs`
--

DROP TABLE IF EXISTS `car_imgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carID` int(11) DEFAULT NULL,
  `imgUrl` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carID` (`carID`),
  CONSTRAINT `car_imgs_ibfk_1` FOREIGN KEY (`carID`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_imgs`
--

LOCK TABLES `car_imgs` WRITE;
/*!40000 ALTER TABLE `car_imgs` DISABLE KEYS */;
INSERT INTO `car_imgs` VALUES
(3,4,'view/images/models/bmw_serie1.png'),
(4,4,'view/images/models/BMW-1-Series-Hatchback-F40.jpg'),
(5,4,'https://i.bstr.es/highmotor/2019/05/BMW-Serie-1-2019-10.jpg'),
(6,4,'https://i.bstr.es/highmotor/2019/05/BMW-Serie-1-2019-11.jpg'),
(7,4,'https://i.bstr.es/highmotor/2019/05/BMW-Serie-1-2019-14.jpg'),
(9,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-1.jpg'),
(10,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-2.jpg'),
(11,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-3.jpg'),
(12,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-5.jpg'),
(13,12,'https://i.bstr.es/highmotor/2019/11/audi-a7-55-tfsie-6.jpg');
/*!40000 ALTER TABLE `car_imgs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vin_number` char(18) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number_plate` char(8) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kms` int(11) DEFAULT NULL,
  `color` char(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `n_doors` int(11) DEFAULT NULL,
  `cv` int(11) DEFAULT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cyear` int(11) DEFAULT NULL,
  `carUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `id_model` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_body` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_cat` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_type` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_id_model` (`id_model`),
  KEY `FK_id_body` (`id_body`),
  KEY `FK_id_cat` (`id_cat`),
  KEY `FK_id_type` (`id_type`),
  CONSTRAINT `FK_id_body` FOREIGN KEY (`id_body`) REFERENCES `body` (`id_body`),
  CONSTRAINT `FK_id_cat` FOREIGN KEY (`id_cat`) REFERENCES `category` (`id_cat`),
  CONSTRAINT `FK_id_model` FOREIGN KEY (`id_model`) REFERENCES `model` (`id_model`),
  CONSTRAINT `FK_id_type` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES
(3,'aaalalall','asda',567,'White',765,4,2342,38.7645,-0.613235,'Bocairent',3242,'view/images/models/audi_a1.png',225,'AA1','BER','0KM','BIO'),
(4,'AOSAJSDND25134679','1263 AJN',0,'Blue',19000,3,334,38.825,-0.607513,'Ontinyent',2019,'view/images/models/bmw_serie1.png',98,'SE1','HBK','0KM','GAS'),
(12,'ILAJFNSRN1237654','1624 ANH',2345,'Red',19000,5,160,38.7832,-0.785194,'Fontanars dels Alforins',2019,'view/images/models/audi_a7_rojo.png',26,'AA7','DEP','2MA','GAS'),
(13,'AKXFRDTGH84512634','8452AJS',25000,'White',18000,5,120,38.84,-0.520343,'Albaida',2019,'view/images/models/seat_ibiza.png',122,'IBI','COM','2MA','GAS'),
(14,'OALDFHSYH62341531','4563ASD',12526,'Blue',28900,5,180,38.699,-0.48099,'Alcoy',2019,'view/images/models/BMW-X3.png',138,'BX3','BER','2MA','GAS'),
(21,'AOSUEJFIL26351487','2176ASD',25900,'Black',29450,5,280,38.7788,-0.438408,'Muro de Alcoy',2016,'view/images/models/ford_focus_nregro.png',24,'FFC','BER','REN','BIO'),
(22,'JASBHDSDF45236142','4521ASD',90000,'Black',45000,3,280,38.3537,-0.481623,'Alicante',2020,'view/images/models/mustang.png',23,'FMU','DEP','2MA','GAS'),
(23,'HAJSBFJHS1234862','8474AJS',12800,'White',48000,5,300,38.8534,-0.442154,'Otos',2022,'view/images/models/ford-mustang-mach-e-min.png',35,'FME','DEP','REN','ELE'),
(24,'HAJSHSDBN12345241','1945NAZ',0,'White',76000,3,400,38.6281,-0.673006,'Onil',2018,'view/images/models/audi_r8.png',3,'AR8','DEP','0KM','ELE');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id_cat` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_name` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_cat` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES
('0KM','Kilómetro 0','Si hablamos de los coches de kilómetro 0, se trata de vehículos que, aunque estén totalmente nuevos y a estrenar, ya han sido matriculados por el concesionario o el propio fabricante y por lo tanto se transfieren al comprador.','view/images/category/kilometro0.jpeg'),
('2MA','Segunda Mano','Cualquier automóvil que no compres directamente en el concesionario, sino que lo venda un particular, puede ser considerado un vehículo usado o de segunda mano. Coche de ocasión: son seminuevos que por lo general han tenido un único dueño.','view/images/category/coche2mano.jpg'),
('REN','Renting','Es un contrato de alquiler de bienes muebles, a cambio del pago de cuotas periódicas prefijadas, que suele ser ofrecido por entidades de crédito y compañías especializadas, pero también por divisiones y filiales de los propios fabricantes de los bienes.','view/images/category/renting.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idCar` int(11) NOT NULL,
  PRIMARY KEY (`username`,`idCar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES
('gfMois13',3),
('gfMois13',21),
('gfMois13',22),
('Pepe1963',24);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model` (
  `id_model` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url_model` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_brand` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_model`),
  KEY `FK_id_brand` (`id_brand`),
  CONSTRAINT `FK_id_brand` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id_brand`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES
('AA1','A1','view/images/models/audi_a1.png','AUD'),
('AA7','A7','view/images/models/audi_a7.png','AUD'),
('AA8','A8','view/images/models/audi_a8.png','AUD'),
('AR8','R8','view/images/models/audi_r8.png','AUD'),
('BM2','M2','view/images/models/bmw_m2.png','BMW'),
('BX3','X3','view/images/models/BMW-X3.png','BMW'),
('FFC','Focus','view/images/models/ford_focus_nregro.png','FRD'),
('FME','Mach-E','view/images/models/ford-mustang-mach-e-min.png','FRD'),
('FMU','Mustang','view/images/models/mustang.png','FRD'),
('IBI','Ibiza','view/images/models/seat_ibiza.png','SAT'),
('RS6','RS6','view/images/models/audi_rs6.png','AUD'),
('SE1','Serie 1','view/images/models/bmw_serie1.png','BMW'),
('SE2','Serie 2','view/images/models/bmw_serie2.png','BMW'),
('SE3','Serie 3','view/images/models/bmw_serie3.png','BMW');
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `username` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id_type` char(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_name` char(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_class` char(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES
('BIO','Biodiésel','fa fa-gas-pump','El BIODIESEL es por definición un biocarburante o biocombustible líquido producido a partir de los aceites vegetales y grasas animales, siendo la soja, la colza, y el girasol, las materias primas más utilizadas mundialmente para este fin.'),
('ELE','Eléctrico','fa fa-battery-full','Un vehículo de pila de combustible es un tipo de vehículo eléctrico que usa una pila de combustible para producir energía eléctrica.'),
('ETN','Etanol','fa fa-gas-pump','El etanol es un compuesto químico obtenido a partir de la fermentación de los azúcares que puede utilizarse como combustible, solo, o bien, mezclado en cantidades variadas con gasolina.'),
('GAS','Gasolina','fa fa-gas-pump','Un motor de gasolina es un motor de combustión interna (máquina térmica) que funciona bajo el Ciclo Otto y obviamente a gasolina; se caracteriza por ser un motor ágil, potente y de bajo torque, si lo comparamos con motores diesel.'),
('GLP','GLP','fa fa-burn','El gas licuado del petróleo ​ es la mezcla de gases licuados presentes en el gas natural o disueltos en el petróleo. Lleva consigo procesos físicos y químicos, por ejemplo el uso de metano.'),
('GNA','Gas Natural','fa fa-burn','El gas natural es una mezcla de gases ligeros de origen natural entre los que se encuentra en mayor proporción el metano, también incluye cantidades de etano, dióxido de carbono, propano entre otros. Su origen parte de la degradación de materia orgánica.'),
('HID','Hidrógeno','fa fa-battery-full','Las pilas de combustible en los vehículos de hidrógeno crean electricidad para hacer funcionar un motor eléctrico usando hidrógeno o un combustible de hidrocarbono y oxígeno del aire. ');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('gfMois13','$2y$12$931He.WvObgBI5AFlrDjTObf.lV9NfR/Dnr1CI0UDNxEOmA9jKLy2','mguerola@gmail.com','client','https://api.multiavatar.com/gfMois13.svg'),
('Kevin844','$2y$12$k2nyaFauOUAHvsMylUJ0tO43ljjGjSHlQsiNpQ2JCIxeL3XA3hRw2','posada772@gmail.com','client','https://api.multiavatar.com/Kevin844.svg'),
('Pepe1963','$2y$12$um3pfxph6fauTZgTLPyOm.3tT672eoxXqbMqywq9JD12frAGuzHX2','pepevillanuevacastillo@gmail.com','client','https://api.multiavatar.com/Pepe1963.svg'),
('Pollete4','$2y$12$2.g9f.TUCgeLEvzsP2A9YOvJ.AEH0MlLN.BM7/AFsuHoAAR6/kku2','pollete@gmail.com','client','https://api.multiavatar.com/pollete.svg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'gconcesionario'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-26 17:50:28
