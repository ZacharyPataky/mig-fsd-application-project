USE `mig_django_db`;

DROP TABLE IF EXISTS `employee_employee`;

--
-- Table structure for table `employee_employees`
--

CREATE TABLE `employee_employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(50) NOT NULL,
  `date_of_joining` date NOT NULL,
  `sex` char NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Inserting data for table `employees`
--

INSERT INTO `employee_employee` 
VALUES 
(1, 'Jane Doe I', '2023-01-01', 'F'),
(2, 'John Doe II','2023-02-28', 'M'),
(3, 'John Doe III','2023-01-01', 'O'),
(4, 'John Doe Jr','2023-03-01', 'M'),
(5, 'John Doe Sr','2022-12-28', 'M'),
(6, 'Demo Employee','2022-12-01', 'F'),
(7, 'Good Employee','2023-03-13', 'O');

