-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-09-2017 a las 21:11:43
-- Versión del servidor: 10.1.24-MariaDB
-- Versión de PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `applauso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aliado`
--

CREATE TABLE `aliado` (
  `code_alia` int(11) NOT NULL,
  `code_usu` int(11) NOT NULL,
  `nomb_alia` varchar(100) NOT NULL,
  `desc_alia` text NOT NULL,
  `ofre_alia` varchar(50) NOT NULL,
  `code_cat_alia` int(11) NOT NULL,
  `pais_alia` int(11) NOT NULL,
  `esta_alia` varchar(100) NOT NULL,
  `ciud_alia` varchar(100) NOT NULL,
  `zip_cod_alia` varchar(10) NOT NULL,
  `dire_alia` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `aliado`
--

INSERT INTO `aliado` (`code_alia`, `code_usu`, `nomb_alia`, `desc_alia`, `ofre_alia`, `code_cat_alia`, `pais_alia`, `esta_alia`, `ciud_alia`, `zip_cod_alia`, `dire_alia`) VALUES
(3, 1, 'Aliado', 'descripcion', 'Ofrece', 1, 1, 'Estado', 'Ciudad', '3350', 'Direccion'),
(4, 1, 'Nombre', 'descripcion', 'Ofrece', 2, 2, 'Estado', 'Ciudad', '3350', 'Direccion'),
(5, 1, 'Nombre', 'descripcion', 'Ofrece', 3, 2, 'Estado', 'Ciudad', '3350', 'Direccion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleterias_eventos`
--

CREATE TABLE `boleterias_eventos` (
  `code_bole` int(11) NOT NULL,
  `code_eve` int(11) NOT NULL,
  `esce_bole` varchar(50) NOT NULL,
  `prec_bole` float NOT NULL,
  `cant_dis_bole` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_aliado`
--

CREATE TABLE `categorias_aliado` (
  `code_cat_alia` int(11) NOT NULL,
  `nomb_cat_alia` varchar(100) NOT NULL,
  `img_cat_alia` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias_aliado`
--

INSERT INTO `categorias_aliado` (`code_cat_alia`, `nomb_cat_alia`, `img_cat_alia`) VALUES
(1, 'Hoteles', ''),
(2, 'Transporte', ''),
(3, 'Ropa', ''),
(4, 'Tecnología', ''),
(5, 'Diversión', ''),
(6, 'Servicio', ''),
(7, 'Otro', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_eventos`
--

CREATE TABLE `categorias_eventos` (
  `code_cat_eve` int(11) NOT NULL,
  `nomb_cat_eve` varchar(100) NOT NULL,
  `img_cat_eve` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias_eventos`
--

INSERT INTO `categorias_eventos` (`code_cat_eve`, `nomb_cat_eve`, `img_cat_eve`) VALUES
(1, 'Eventos de la Comunidad', ''),
(2, 'Deportes Profesionales', ''),
(3, 'Fiesta de Club', ''),
(4, 'Artista', ''),
(5, 'Festivales', ''),
(6, 'Atletismo Universitario', ''),
(7, 'Lugares y Promotores', ''),
(8, 'Arte y Teatro', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_publicidad`
--

CREATE TABLE `categorias_publicidad` (
  `cod_cat_publ` int(11) NOT NULL,
  `nomb_cat_publ` varchar(100) NOT NULL,
  `img_cat_publ` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `categorias_publicidad`
--

INSERT INTO `categorias_publicidad` (`cod_cat_publ`, `nomb_cat_publ`, `img_cat_publ`) VALUES
(1, 'Premios', ''),
(2, 'Retos', ''),
(3, 'Promociones', ''),
(4, 'Conocimiento de la Marca', ''),
(5, 'Eventos', ''),
(6, 'Otro', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_restaurantes`
--

CREATE TABLE `categorias_restaurantes` (
  `code_res_cat` int(11) NOT NULL,
  `nomb_cat` varchar(100) DEFAULT NULL,
  `imag_cat` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `code_eve` int(11) NOT NULL,
  `code_usu` int(11) NOT NULL,
  `code_cat_eve` int(11) NOT NULL,
  `code_tipo_eve` int(11) NOT NULL,
  `priv_eve` varchar(10) NOT NULL,
  `nomb_eve` varchar(100) NOT NULL,
  `desc_eve` text NOT NULL,
  `esta_eve` varchar(100) NOT NULL,
  `lati_eve` text NOT NULL,
  `long_eve` text NOT NULL,
  `rest_eda_eve` varchar(3) NOT NULL,
  `term_cond_eve` text NOT NULL,
  `fecha_ini_eve` datetime NOT NULL,
  `fecha_fin_eve` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`code_eve`, `code_usu`, `code_cat_eve`, `code_tipo_eve`, `priv_eve`, `nomb_eve`, `desc_eve`, `esta_eve`, `lati_eve`, `long_eve`, `rest_eda_eve`, `term_cond_eve`, `fecha_ini_eve`, `fecha_fin_eve`) VALUES
(1, 1, 1, 1, 'priva', 'nombre', 'descripcion', 'esatado', '-102390291', '-093023021', 'res', 'terminos y condiciones', '2017-09-14 00:00:00', '2017-09-16 00:00:00'),
(2, 1, 2, 2, 'priva', 'nombre', 'descripcion', 'esatado', 'Latitud', 'Longitud', 'res', 'terminos y condiciones', '2017-01-01 00:00:00', '2017-02-01 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_restaurante`
--

CREATE TABLE `menu_restaurante` (
  `code_men` int(11) NOT NULL,
  `code_res` int(11) DEFAULT NULL,
  `nomb_men` varchar(50) DEFAULT NULL,
  `imag_men` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_pais` int(11) NOT NULL,
  `iso` varchar(10) NOT NULL,
  `pais` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_pais`, `iso`, `pais`) VALUES
(1, 'AF', 'Afganistán'),
(2, 'AX', 'Islas Gland'),
(3, 'AL', 'Albania'),
(4, 'DE', 'Alemania'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antártida'),
(9, 'AG', 'Antigua y Barbuda'),
(10, 'AN', 'Antillas Holandesas'),
(11, 'SA', 'Arabia Saudí'),
(12, 'DZ', 'Argelia'),
(13, 'AR', 'Argentina'),
(14, 'AM', 'Armenia'),
(15, 'AW', 'Aruba'),
(16, 'AU', 'Australia'),
(17, 'AT', 'Austria'),
(18, 'AZ', 'Azerbaiyán'),
(19, 'BS', 'Bahamas'),
(20, 'BH', 'Bahréin'),
(21, 'BD', 'Bangladesh'),
(22, 'BB', 'Barbados'),
(23, 'BY', 'Bielorrusia'),
(24, 'BE', 'Bélgica'),
(25, 'BZ', 'Belice'),
(26, 'BJ', 'Benin'),
(27, 'BM', 'Bermudas'),
(28, 'BT', 'Bhután'),
(29, 'BO', 'Bolivia'),
(30, 'BA', 'Bosnia y Herzegovina'),
(31, 'BW', 'Botsuana'),
(32, 'BV', 'Isla Bouvet'),
(33, 'BR', 'Brasil'),
(34, 'BN', 'Brunéi'),
(35, 'BG', 'Bulgaria'),
(36, 'BF', 'Burkina Faso'),
(37, 'BI', 'Burundi'),
(38, 'CV', 'Cabo Verde'),
(39, 'KY', 'Islas Caimán'),
(40, 'KH', 'Camboya'),
(41, 'CM', 'Camerún'),
(42, 'CA', 'Canadá'),
(43, 'CF', 'República Centroafricana'),
(44, 'TD', 'Chad'),
(45, 'CZ', 'República Checa'),
(46, 'CL', 'Chile'),
(47, 'CN', 'China'),
(48, 'CY', 'Chipre'),
(49, 'CX', 'Isla de Navidad'),
(50, 'VA', 'Ciudad del Vaticano'),
(51, 'CC', 'Islas Cocos'),
(52, 'CO', 'Colombia'),
(53, 'KM', 'Comoras'),
(54, 'CD', 'República Democrática del Congo'),
(55, 'CG', 'Congo'),
(56, 'CK', 'Islas Cook'),
(57, 'KP', 'Corea del Norte'),
(58, 'KR', 'Corea del Sur'),
(59, 'CI', 'Costa de Marfil'),
(60, 'CR', 'Costa Rica'),
(61, 'HR', 'Croacia'),
(62, 'CU', 'Cuba'),
(63, 'DK', 'Dinamarca'),
(64, 'DM', 'Dominica'),
(65, 'DO', 'República Dominicana'),
(66, 'EC', 'Ecuador'),
(67, 'EG', 'Egipto'),
(68, 'SV', 'El Salvador'),
(69, 'AE', 'Emiratos Árabes Unidos'),
(70, 'ER', 'Eritrea'),
(71, 'SK', 'Eslovaquia'),
(72, 'SI', 'Eslovenia'),
(73, 'ES', 'España'),
(74, 'UM', 'Islas ultramarinas de Estados Unidos'),
(75, 'US', 'Estados Unidos'),
(76, 'EE', 'Estonia'),
(77, 'ET', 'Etiopía'),
(78, 'FO', 'Islas Feroe'),
(79, 'PH', 'Filipinas'),
(80, 'FI', 'Finlandia'),
(81, 'FJ', 'Fiyi'),
(82, 'FR', 'Francia'),
(83, 'GA', 'Gabón'),
(84, 'GM', 'Gambia'),
(85, 'GE', 'Georgia'),
(86, 'GS', 'Islas Georgias del Sur y Sandwich del Sur'),
(87, 'GH', 'Ghana'),
(88, 'GI', 'Gibraltar'),
(89, 'GD', 'Granada'),
(90, 'GR', 'Grecia'),
(91, 'GL', 'Groenlandia'),
(92, 'GP', 'Guadalupe'),
(93, 'GU', 'Guam'),
(94, 'GT', 'Guatemala'),
(95, 'GF', 'Guayana Francesa'),
(96, 'GN', 'Guinea'),
(97, 'GQ', 'Guinea Ecuatorial'),
(98, 'GW', 'Guinea-Bissau'),
(99, 'GY', 'Guyana'),
(100, 'HT', 'Haití'),
(101, 'HM', 'Islas Heard y McDonald'),
(102, 'HN', 'Honduras'),
(103, 'HK', 'Hong Kong'),
(104, 'HU', 'Hungría'),
(105, 'IN', 'India'),
(106, 'ID', 'Indonesia'),
(107, 'IR', 'Irán'),
(108, 'IQ', 'Iraq'),
(109, 'IE', 'Irlanda'),
(110, 'IS', 'Islandia'),
(111, 'IL', 'Israel'),
(112, 'IT', 'Italia'),
(113, 'JM', 'Jamaica'),
(114, 'JP', 'Japón'),
(115, 'JO', 'Jordania'),
(116, 'KZ', 'Kazajstán'),
(117, 'KE', 'Kenia'),
(118, 'KG', 'Kirguistán'),
(119, 'KI', 'Kiribati'),
(120, 'KW', 'Kuwait'),
(121, 'LA', 'Laos'),
(122, 'LS', 'Lesotho'),
(123, 'LV', 'Letonia'),
(124, 'LB', 'Líbano'),
(125, 'LR', 'Liberia'),
(126, 'LY', 'Libia'),
(127, 'LI', 'Liechtenstein'),
(128, 'LT', 'Lituania'),
(129, 'LU', 'Luxemburgo'),
(130, 'MO', 'Macao'),
(131, 'MK', 'ARY Macedonia'),
(132, 'MG', 'Madagascar'),
(133, 'MY', 'Malasia'),
(134, 'MW', 'Malawi'),
(135, 'MV', 'Maldivas'),
(136, 'ML', 'Malí'),
(137, 'MT', 'Malta'),
(138, 'FK', 'Islas Malvinas'),
(139, 'MP', 'Islas Marianas del Norte'),
(140, 'MA', 'Marruecos'),
(141, 'MH', 'Islas Marshall'),
(142, 'MQ', 'Martinica'),
(143, 'MU', 'Mauricio'),
(144, 'MR', 'Mauritania'),
(145, 'YT', 'Mayotte'),
(146, 'MX', 'México'),
(147, 'FM', 'Micronesia'),
(148, 'MD', 'Moldavia'),
(149, 'MC', 'Mónaco'),
(150, 'MN', 'Mongolia'),
(151, 'MS', 'Montserrat'),
(152, 'MZ', 'Mozambique'),
(153, 'MM', 'Myanmar'),
(154, 'NA', 'Namibia'),
(155, 'NR', 'Nauru'),
(156, 'NP', 'Nepal'),
(157, 'NI', 'Nicaragua'),
(158, 'NE', 'Níger'),
(159, 'NG', 'Nigeria'),
(160, 'NU', 'Niue'),
(161, 'NF', 'Isla Norfolk'),
(162, 'NO', 'Noruega'),
(163, 'NC', 'Nueva Caledonia'),
(164, 'NZ', 'Nueva Zelanda'),
(165, 'OM', 'Omán'),
(166, 'NL', 'Países Bajos'),
(167, 'PK', 'Pakistán'),
(168, 'PW', 'Palau'),
(169, 'PS', 'Palestina'),
(170, 'PA', 'Panamá'),
(171, 'PG', 'Papúa Nueva Guinea'),
(172, 'PY', 'Paraguay'),
(173, 'PE', 'Perú'),
(174, 'PN', 'Islas Pitcairn'),
(175, 'PF', 'Polinesia Francesa'),
(176, 'PL', 'Polonia'),
(177, 'PT', 'Portugal'),
(178, 'PR', 'Puerto Rico'),
(179, 'QA', 'Qatar'),
(180, 'GB', 'Reino Unido'),
(181, 'RE', 'Reunión'),
(182, 'RW', 'Ruanda'),
(183, 'RO', 'Rumania'),
(184, 'RU', 'Rusia'),
(185, 'EH', 'Sahara Occidental'),
(186, 'SB', 'Islas Salomón'),
(187, 'WS', 'Samoa'),
(188, 'AS', 'Samoa Americana'),
(189, 'KN', 'San Cristóbal y Nevis'),
(190, 'SM', 'San Marino'),
(191, 'PM', 'San Pedro y Miquelón'),
(192, 'VC', 'San Vicente y las Granadinas'),
(193, 'SH', 'Santa Helena'),
(194, 'LC', 'Santa Lucía'),
(195, 'ST', 'Santo Tomé y Príncipe'),
(196, 'SN', 'Senegal'),
(197, 'CS', 'Serbia y Montenegro'),
(198, 'SC', 'Seychelles'),
(199, 'SL', 'Sierra Leona'),
(200, 'SG', 'Singapur'),
(201, 'SY', 'Siria'),
(202, 'SO', 'Somalia'),
(203, 'LK', 'Sri Lanka'),
(204, 'SZ', 'Suazilandia'),
(205, 'ZA', 'Sudáfrica'),
(206, 'SD', 'Sudán'),
(207, 'SE', 'Suecia'),
(208, 'CH', 'Suiza'),
(209, 'SR', 'Surinam'),
(210, 'SJ', 'Svalbard y Jan Mayen'),
(211, 'TH', 'Tailandia'),
(212, 'TW', 'Taiwán'),
(213, 'TZ', 'Tanzania'),
(214, 'TJ', 'Tayikistán'),
(215, 'IO', 'Territorio Británico del Océano Índico'),
(216, 'TF', 'Territorios Australes Franceses'),
(217, 'TL', 'Timor Oriental'),
(218, 'TG', 'Togo'),
(219, 'TK', 'Tokelau'),
(220, 'TO', 'Tonga'),
(221, 'TT', 'Trinidad y Tobago'),
(222, 'TN', 'Túnez'),
(223, 'TC', 'Islas Turcas y Caicos'),
(224, 'TM', 'Turkmenistán'),
(225, 'TR', 'Turquía'),
(226, 'TV', 'Tuvalu'),
(227, 'UA', 'Ucrania'),
(228, 'UG', 'Uganda'),
(229, 'UY', 'Uruguay'),
(230, 'UZ', 'Uzbekistán'),
(231, 'VU', 'Vanuatu'),
(232, 'VE', 'Venezuela'),
(233, 'VN', 'Vietnam'),
(234, 'VG', 'Islas Vírgenes Británicas'),
(235, 'VI', 'Islas Vírgenes de los Estados Unidos'),
(236, 'WF', 'Wallis y Futuna'),
(237, 'YE', 'Yemen'),
(238, 'DJ', 'Yibuti'),
(239, 'ZM', 'Zambia'),
(240, 'ZW', 'Zimbabue');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrocinantes_eve_publ`
--

CREATE TABLE `patrocinantes_eve_publ` (
  `code_patro` int(11) NOT NULL,
  `code_eve` int(11) DEFAULT NULL,
  `code_publ` int(11) DEFAULT NULL,
  `site_name_patro` varchar(100) NOT NULL,
  `url_patro` text NOT NULL,
  `img_url_patro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_aliado`
--

CREATE TABLE `productos_aliado` (
  `code_pro_alia` int(11) NOT NULL,
  `code_alia` int(11) NOT NULL,
  `nomb_pro_alia` varchar(100) NOT NULL,
  `prec_pro_alia` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_restaurante`
--

CREATE TABLE `productos_restaurante` (
  `code_pro` int(11) NOT NULL,
  `code_men` int(11) DEFAULT NULL,
  `code_sub` int(11) DEFAULT NULL,
  `nomb_pro` varchar(100) DEFAULT NULL,
  `sub_nom_pro` varchar(50) DEFAULT NULL,
  `prec_pro` float DEFAULT NULL,
  `cant_pro` int(11) DEFAULT NULL,
  `imag_pro` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidad`
--

CREATE TABLE `publicidad` (
  `cod_publ` int(11) NOT NULL,
  `code_usu` int(11) NOT NULL,
  `code_cat_publ` int(11) NOT NULL,
  `code_tip_publ` int(11) NOT NULL,
  `nomb_camp` varchar(100) NOT NULL,
  `desc_camp` text NOT NULL,
  `enca_publ` text NOT NULL,
  `land_page_publ` text NOT NULL,
  `pais_publ` int(11) NOT NULL,
  `esta_publ` varchar(100) NOT NULL,
  `ciud_publ` varchar(100) NOT NULL,
  `zip_cod_publ` varchar(10) NOT NULL,
  `dire_publ` text NOT NULL,
  `empr_publ` varchar(100) NOT NULL,
  `desc_empr_publ` text NOT NULL,
  `nomb_enca_publ` varchar(100) NOT NULL,
  `tlf_enca_publ` varchar(15) NOT NULL,
  `face_publ` text NOT NULL,
  `inst_publ` text NOT NULL,
  `twit_publ` text NOT NULL,
  `fecha_ini_publ` datetime NOT NULL,
  `fecha_fin_publ` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicidad`
--

INSERT INTO `publicidad` (`cod_publ`, `code_usu`, `code_cat_publ`, `code_tip_publ`, `nomb_camp`, `desc_camp`, `enca_publ`, `land_page_publ`, `pais_publ`, `esta_publ`, `ciud_publ`, `zip_cod_publ`, `dire_publ`, `empr_publ`, `desc_empr_publ`, `nomb_enca_publ`, `tlf_enca_publ`, `face_publ`, `inst_publ`, `twit_publ`, `fecha_ini_publ`, `fecha_fin_publ`) VALUES
(3, 1, 1, 1, 'Nombre de Camp', 'Descripcion Camp', 'Encargado', 'Land Page de la Publicidad', 1, 'Estado', 'Cuidad', 'Codigo Pos', 'Direccion', 'Nombre de la Empresa', 'Descripcion Empresa', 'Nombre Encargado', '04125118993', 'Url en Facebook', 'Url en Instagram', 'Url en Twitter', '2017-01-01 00:00:00', '2017-02-01 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicidad_en_eventos`
--

CREATE TABLE `publicidad_en_eventos` (
  `code_pu_eve` int(11) NOT NULL,
  `code_publ` int(11) NOT NULL,
  `code_eve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurantes`
--

CREATE TABLE `restaurantes` (
  `code_res` int(11) NOT NULL,
  `code_usu` int(11) DEFAULT NULL,
  `code_res_cat` int(11) DEFAULT NULL,
  `nomb_res` varchar(100) DEFAULT NULL,
  `dire_res` text,
  `ciud_res` text,
  `esta_res` varchar(30) DEFAULT NULL,
  `zip_res` varchar(5) DEFAULT NULL,
  `telf_res` varchar(15) DEFAULT NULL,
  `fax_res` varchar(25) DEFAULT NULL,
  `mana_res` varchar(100) DEFAULT NULL,
  `desc_res` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurantes_en_evento`
--

CREATE TABLE `restaurantes_en_evento` (
  `code_res_eve` int(11) NOT NULL,
  `code_res` int(11) DEFAULT NULL,
  `code_eve` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_aliado`
--

CREATE TABLE `servicios_aliado` (
  `code_serv_alia` int(11) NOT NULL,
  `code_alia` int(11) NOT NULL,
  `desc_serv_alia` text NOT NULL,
  `itin_serv_alia` text NOT NULL,
  `img_serv_alia` text NOT NULL,
  `pie_img_serv` varchar(100) NOT NULL,
  `prec_serv_alia` float NOT NULL,
  `por_tiempo_ser` varchar(50) NOT NULL,
  `mone_serv_alia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sub_menu_restaurante`
--

CREATE TABLE `sub_menu_restaurante` (
  `code_sub` int(11) NOT NULL,
  `code_men` int(11) DEFAULT NULL,
  `nomb_sub` varchar(100) DEFAULT NULL,
  `imag_sub` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tdcs`
--

CREATE TABLE `tdcs` (
  `code_tar` int(11) NOT NULL,
  `code_usu` int(11) DEFAULT NULL,
  `nume_tar` varchar(50) DEFAULT NULL,
  `venc_tar` varchar(8) DEFAULT NULL,
  `cvv_tar` varchar(4) DEFAULT NULL,
  `nomb_tar` varchar(50) DEFAULT NULL,
  `tipo_tar` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tdcs`
--

INSERT INTO `tdcs` (`code_tar`, `code_usu`, `nume_tar`, `venc_tar`, `cvv_tar`, `nomb_tar`, `tipo_tar`) VALUES
(3, 18, '5899 4173 9762 1565', '05 / 21', '0346', 'Maestro', 'D'),
(4, 18, '5899 4141 7397 6215', '02 / 21', '0346', 'Master Card', 'C');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_eventos`
--

CREATE TABLE `tipos_de_eventos` (
  `code_tipo_eve` int(11) NOT NULL,
  `nomb_tipo_eve` varchar(100) NOT NULL,
  `img_tipo_eve` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipos_de_eventos`
--

INSERT INTO `tipos_de_eventos` (`code_tipo_eve`, `nomb_tipo_eve`, `img_tipo_eve`) VALUES
(1, 'Deporte', ''),
(2, 'Música', ''),
(3, 'Familiar', ''),
(4, 'Cultural', ''),
(5, 'Festival', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_de_publicidad`
--

CREATE TABLE `tipos_de_publicidad` (
  `cod_tip_publ` int(11) NOT NULL,
  `nomb_tip_publ` varchar(100) NOT NULL,
  `img_tip_publ` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipos_de_publicidad`
--

INSERT INTO `tipos_de_publicidad` (`cod_tip_publ`, `nomb_tip_publ`, `img_tip_publ`) VALUES
(1, 'Niños', ''),
(2, 'Adolescentes', ''),
(3, 'Tercera Edad', ''),
(4, 'Mujeres', ''),
(5, 'Hombres', ''),
(6, 'Mascotas', ''),
(7, 'Otro', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `code_tran` int(11) NOT NULL,
  `code_usu` int(11) NOT NULL,
  `desc_tran` text NOT NULL,
  `monto_tran` float NOT NULL,
  `fecha_tran` datetime NOT NULL,
  `tipo_tran` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `code_usu` int(11) NOT NULL,
  `nomb_usu` varchar(25) DEFAULT NULL,
  `apel_usu` varchar(30) DEFAULT NULL,
  `fech_nac_usu` date DEFAULT NULL,
  `iden_usu` varchar(30) DEFAULT NULL,
  `corr_usu` varchar(300) DEFAULT NULL,
  `pass_usu` varchar(300) DEFAULT NULL,
  `telf_usu` varchar(15) DEFAULT NULL,
  `sexo_usu` varchar(1) DEFAULT NULL,
  `mani_usu` varchar(50) DEFAULT NULL,
  `code_pai` int(11) DEFAULT NULL,
  `ciud_usu` text,
  `tipo_usu` varchar(1) DEFAULT NULL,
  `emp_usu` text,
  `ocupa_usu` text,
  `imag_usu` text,
  `fech_reg_usu` datetime DEFAULT NULL,
  `sald_usu` float DEFAULT NULL,
  `appl_usu` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`code_usu`, `nomb_usu`, `apel_usu`, `fech_nac_usu`, `iden_usu`, `corr_usu`, `pass_usu`, `telf_usu`, `sexo_usu`, `mani_usu`, `code_pai`, `ciud_usu`, `tipo_usu`, `emp_usu`, `ocupa_usu`, `imag_usu`, `fech_reg_usu`, `sald_usu`, `appl_usu`) VALUES
(1, 'Carlos', 'Castellanos', '1993-10-15', 'V-21024060', 'castellanoscarlos15@gmail.com', '12345', NULL, NULL, NULL, 1, 'Guanare', 'C', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Ernesto', 'Castellanos', '1993-10-10', '29888111', 'casteca@gmail.com', '12345', NULL, NULL, NULL, 1, 'Guanare', 'C', NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Blas Jesus', 'Parra Hernandez', '1994-08-25', 'V-24021645', 'blas@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', '04125118993', 'M', NULL, 232, 'Guanare', NULL, NULL, NULL, 'http://localhost/', '2017-09-22 00:00:00', NULL, NULL),
(19, '', '', NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'http://localhost/', '2017-09-25 00:00:00', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aliado`
--
ALTER TABLE `aliado`
  ADD PRIMARY KEY (`code_alia`),
  ADD KEY `code_usu` (`code_usu`),
  ADD KEY `code_cat_alia` (`code_cat_alia`),
  ADD KEY `pais_alia` (`pais_alia`);

--
-- Indices de la tabla `boleterias_eventos`
--
ALTER TABLE `boleterias_eventos`
  ADD PRIMARY KEY (`code_bole`),
  ADD KEY `code_eve` (`code_eve`);

--
-- Indices de la tabla `categorias_aliado`
--
ALTER TABLE `categorias_aliado`
  ADD PRIMARY KEY (`code_cat_alia`);

--
-- Indices de la tabla `categorias_eventos`
--
ALTER TABLE `categorias_eventos`
  ADD PRIMARY KEY (`code_cat_eve`);

--
-- Indices de la tabla `categorias_publicidad`
--
ALTER TABLE `categorias_publicidad`
  ADD PRIMARY KEY (`cod_cat_publ`);

--
-- Indices de la tabla `categorias_restaurantes`
--
ALTER TABLE `categorias_restaurantes`
  ADD PRIMARY KEY (`code_res_cat`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`code_eve`),
  ADD KEY `code_usu` (`code_usu`),
  ADD KEY `tipo_eve` (`code_tipo_eve`),
  ADD KEY `code_cat_eve` (`code_cat_eve`);

--
-- Indices de la tabla `menu_restaurante`
--
ALTER TABLE `menu_restaurante`
  ADD PRIMARY KEY (`code_men`),
  ADD KEY `code_res` (`code_res`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `patrocinantes_eve_publ`
--
ALTER TABLE `patrocinantes_eve_publ`
  ADD PRIMARY KEY (`code_patro`),
  ADD KEY `code_eve` (`code_eve`,`code_publ`),
  ADD KEY `code_publ` (`code_publ`);

--
-- Indices de la tabla `productos_aliado`
--
ALTER TABLE `productos_aliado`
  ADD PRIMARY KEY (`code_pro_alia`),
  ADD KEY `code_pro_alia` (`code_pro_alia`,`code_alia`),
  ADD KEY `code_alia` (`code_alia`);

--
-- Indices de la tabla `productos_restaurante`
--
ALTER TABLE `productos_restaurante`
  ADD PRIMARY KEY (`code_pro`),
  ADD KEY `code_men` (`code_men`),
  ADD KEY `code_sub` (`code_sub`);

--
-- Indices de la tabla `publicidad`
--
ALTER TABLE `publicidad`
  ADD PRIMARY KEY (`cod_publ`),
  ADD UNIQUE KEY `code_usu` (`code_usu`),
  ADD KEY `code_cat_publ` (`code_cat_publ`),
  ADD KEY `code_tip_publ` (`code_tip_publ`),
  ADD KEY `pais_publ` (`pais_publ`);

--
-- Indices de la tabla `publicidad_en_eventos`
--
ALTER TABLE `publicidad_en_eventos`
  ADD PRIMARY KEY (`code_pu_eve`),
  ADD KEY `code_publ` (`code_publ`),
  ADD KEY `code_eve` (`code_eve`);

--
-- Indices de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD PRIMARY KEY (`code_res`),
  ADD KEY `code_usu` (`code_usu`),
  ADD KEY `code_res_cat` (`code_res_cat`);

--
-- Indices de la tabla `restaurantes_en_evento`
--
ALTER TABLE `restaurantes_en_evento`
  ADD PRIMARY KEY (`code_res_eve`),
  ADD KEY `code_res` (`code_res`),
  ADD KEY `code_eve` (`code_eve`);

--
-- Indices de la tabla `servicios_aliado`
--
ALTER TABLE `servicios_aliado`
  ADD PRIMARY KEY (`code_serv_alia`),
  ADD KEY `code_alia` (`code_alia`);

--
-- Indices de la tabla `sub_menu_restaurante`
--
ALTER TABLE `sub_menu_restaurante`
  ADD PRIMARY KEY (`code_sub`),
  ADD KEY `code_men` (`code_men`);

--
-- Indices de la tabla `tdcs`
--
ALTER TABLE `tdcs`
  ADD PRIMARY KEY (`code_tar`),
  ADD UNIQUE KEY `nume_tar` (`nume_tar`),
  ADD KEY `code_usu` (`code_usu`);

--
-- Indices de la tabla `tipos_de_eventos`
--
ALTER TABLE `tipos_de_eventos`
  ADD PRIMARY KEY (`code_tipo_eve`);

--
-- Indices de la tabla `tipos_de_publicidad`
--
ALTER TABLE `tipos_de_publicidad`
  ADD PRIMARY KEY (`cod_tip_publ`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`code_tran`),
  ADD KEY `code_usu` (`code_usu`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`code_usu`),
  ADD UNIQUE KEY `iden_usu` (`iden_usu`),
  ADD UNIQUE KEY `corr_usu` (`corr_usu`),
  ADD UNIQUE KEY `mani_usu` (`mani_usu`),
  ADD KEY `code_pai` (`code_pai`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aliado`
--
ALTER TABLE `aliado`
  MODIFY `code_alia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `boleterias_eventos`
--
ALTER TABLE `boleterias_eventos`
  MODIFY `code_bole` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `categorias_aliado`
--
ALTER TABLE `categorias_aliado`
  MODIFY `code_cat_alia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `categorias_eventos`
--
ALTER TABLE `categorias_eventos`
  MODIFY `code_cat_eve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `categorias_publicidad`
--
ALTER TABLE `categorias_publicidad`
  MODIFY `cod_cat_publ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `categorias_restaurantes`
--
ALTER TABLE `categorias_restaurantes`
  MODIFY `code_res_cat` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `code_eve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `menu_restaurante`
--
ALTER TABLE `menu_restaurante`
  MODIFY `code_men` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_pais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;
--
-- AUTO_INCREMENT de la tabla `patrocinantes_eve_publ`
--
ALTER TABLE `patrocinantes_eve_publ`
  MODIFY `code_patro` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `productos_aliado`
--
ALTER TABLE `productos_aliado`
  MODIFY `code_pro_alia` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `productos_restaurante`
--
ALTER TABLE `productos_restaurante`
  MODIFY `code_pro` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `publicidad`
--
ALTER TABLE `publicidad`
  MODIFY `cod_publ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `publicidad_en_eventos`
--
ALTER TABLE `publicidad_en_eventos`
  MODIFY `code_pu_eve` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  MODIFY `code_res` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `restaurantes_en_evento`
--
ALTER TABLE `restaurantes_en_evento`
  MODIFY `code_res_eve` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `servicios_aliado`
--
ALTER TABLE `servicios_aliado`
  MODIFY `code_serv_alia` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `sub_menu_restaurante`
--
ALTER TABLE `sub_menu_restaurante`
  MODIFY `code_sub` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tdcs`
--
ALTER TABLE `tdcs`
  MODIFY `code_tar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tipos_de_eventos`
--
ALTER TABLE `tipos_de_eventos`
  MODIFY `code_tipo_eve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `tipos_de_publicidad`
--
ALTER TABLE `tipos_de_publicidad`
  MODIFY `cod_tip_publ` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `code_tran` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `code_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aliado`
--
ALTER TABLE `aliado`
  ADD CONSTRAINT `aliado_ibfk_1` FOREIGN KEY (`code_usu`) REFERENCES `usuarios` (`code_usu`),
  ADD CONSTRAINT `aliado_ibfk_2` FOREIGN KEY (`code_cat_alia`) REFERENCES `categorias_aliado` (`code_cat_alia`),
  ADD CONSTRAINT `aliado_ibfk_3` FOREIGN KEY (`pais_alia`) REFERENCES `paises` (`id_pais`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `boleterias_eventos`
--
ALTER TABLE `boleterias_eventos`
  ADD CONSTRAINT `boleterias_eventos_ibfk_1` FOREIGN KEY (`code_eve`) REFERENCES `eventos` (`code_eve`);

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`code_usu`) REFERENCES `usuarios` (`code_usu`),
  ADD CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`code_tipo_eve`) REFERENCES `tipos_de_eventos` (`code_tipo_eve`),
  ADD CONSTRAINT `eventos_ibfk_3` FOREIGN KEY (`code_cat_eve`) REFERENCES `categorias_eventos` (`code_cat_eve`);

--
-- Filtros para la tabla `menu_restaurante`
--
ALTER TABLE `menu_restaurante`
  ADD CONSTRAINT `menu_restaurante_ibfk_1` FOREIGN KEY (`code_res`) REFERENCES `restaurantes` (`code_res`);

--
-- Filtros para la tabla `patrocinantes_eve_publ`
--
ALTER TABLE `patrocinantes_eve_publ`
  ADD CONSTRAINT `patrocinantes_eve_publ_ibfk_1` FOREIGN KEY (`code_eve`) REFERENCES `eventos` (`code_eve`),
  ADD CONSTRAINT `patrocinantes_eve_publ_ibfk_2` FOREIGN KEY (`code_publ`) REFERENCES `publicidad` (`cod_publ`);

--
-- Filtros para la tabla `productos_aliado`
--
ALTER TABLE `productos_aliado`
  ADD CONSTRAINT `productos_aliado_ibfk_1` FOREIGN KEY (`code_alia`) REFERENCES `aliado` (`code_alia`);

--
-- Filtros para la tabla `productos_restaurante`
--
ALTER TABLE `productos_restaurante`
  ADD CONSTRAINT `productos_restaurante_ibfk_1` FOREIGN KEY (`code_men`) REFERENCES `menu_restaurante` (`code_men`),
  ADD CONSTRAINT `productos_restaurante_ibfk_2` FOREIGN KEY (`code_sub`) REFERENCES `sub_menu_restaurante` (`code_sub`);

--
-- Filtros para la tabla `publicidad`
--
ALTER TABLE `publicidad`
  ADD CONSTRAINT `publicidad_ibfk_1` FOREIGN KEY (`code_usu`) REFERENCES `usuarios` (`code_usu`),
  ADD CONSTRAINT `publicidad_ibfk_2` FOREIGN KEY (`code_cat_publ`) REFERENCES `categorias_publicidad` (`cod_cat_publ`),
  ADD CONSTRAINT `publicidad_ibfk_3` FOREIGN KEY (`code_tip_publ`) REFERENCES `tipos_de_publicidad` (`cod_tip_publ`),
  ADD CONSTRAINT `publicidad_ibfk_4` FOREIGN KEY (`pais_publ`) REFERENCES `paises` (`id_pais`);

--
-- Filtros para la tabla `publicidad_en_eventos`
--
ALTER TABLE `publicidad_en_eventos`
  ADD CONSTRAINT `publicidad_en_eventos_ibfk_1` FOREIGN KEY (`code_publ`) REFERENCES `publicidad` (`cod_publ`),
  ADD CONSTRAINT `publicidad_en_eventos_ibfk_2` FOREIGN KEY (`code_eve`) REFERENCES `eventos` (`code_eve`);

--
-- Filtros para la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD CONSTRAINT `restaurantes_ibfk_1` FOREIGN KEY (`code_usu`) REFERENCES `usuarios` (`code_usu`),
  ADD CONSTRAINT `restaurantes_ibfk_2` FOREIGN KEY (`code_res_cat`) REFERENCES `categorias_restaurantes` (`code_res_cat`);

--
-- Filtros para la tabla `restaurantes_en_evento`
--
ALTER TABLE `restaurantes_en_evento`
  ADD CONSTRAINT `restaurantes_en_evento_ibfk_1` FOREIGN KEY (`code_res`) REFERENCES `restaurantes` (`code_res`),
  ADD CONSTRAINT `restaurantes_en_evento_ibfk_2` FOREIGN KEY (`code_eve`) REFERENCES `eventos` (`code_eve`);

--
-- Filtros para la tabla `servicios_aliado`
--
ALTER TABLE `servicios_aliado`
  ADD CONSTRAINT `servicios_aliado_ibfk_1` FOREIGN KEY (`code_alia`) REFERENCES `aliado` (`code_alia`);

--
-- Filtros para la tabla `sub_menu_restaurante`
--
ALTER TABLE `sub_menu_restaurante`
  ADD CONSTRAINT `sub_menu_restaurante_ibfk_1` FOREIGN KEY (`code_men`) REFERENCES `menu_restaurante` (`code_men`);

--
-- Filtros para la tabla `tdcs`
--
ALTER TABLE `tdcs`
  ADD CONSTRAINT `tdcs_ibfk_1` FOREIGN KEY (`code_usu`) REFERENCES `usuarios` (`code_usu`);

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`code_usu`) REFERENCES `usuarios` (`code_usu`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`code_pai`) REFERENCES `paises` (`id_pais`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
