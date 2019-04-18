<?php
/**
 * NOTICE OF LICENSE
 *
 * This file is licenced under the Software License Agreement.
 * With the purchase or the installation of the software in your application
 * you accept the licence agreement.
 *
 * You must not modify, adapt or create derivative works of this source code
 *
 * @author    Patryk Spychalski
 * @copyright 2018-2019 Patryk Spychalski
 * @license   LICENSE.txt
 */

class <%= className %> extends ObjectModel
{
    public static $definition = array(
        'table' => '',
        'primary' => 'id_',
        'multilang' => false,
        'fields' => array(
            'column_name' => array(
                'type' => self::TYPE_STRING,
                'validate' => 'isString'
            )
        )
    );

    public static function createTable()
    {
        self::validateDefinition();
        $lang_fields = array();

        $sql = "CREATE TABLE IF NOT EXISTS `"._DB_PREFIX_.self::$definition['table']."` (
			".self::$definition['primary']." INT AUTO_INCREMENT,
		";

        foreach (self::$definition['fields'] as $column => $properties) {
            if (isset($properties['lang']) && $properties['lang'] == true) {
                $lang_fields[$column] = $properties;
                continue;
            }
            $type = self::getTypeName($properties['type']);
            $sql .= "`$column` $type,";
        }

        $sql .= "
		PRIMARY KEY(".self::$definition['primary'].")
		) COLLATE 'utf8_general_ci'";

        if (!Db::getInstance()->execute($sql)) {
            return false;
        }

        $sql = "CREATE TABLE IF NOT EXISTS `"._DB_PREFIX_.self::$definition['table']."_lang` (
			".self::$definition['primary']." INT,
			id_lang INT,
		";
        foreach ($lang_fields as $column => $properties) {
            $type = self::getTypeName($properties['type']);
            $sql .= "`$column` $type,";
        }
        $sql = rtrim($sql, ',');
        $sql .= ") COLLATE 'utf8_general_ci'";

        if (!Db::getInstance()->execute($sql)) {
            return false;
        }

        return true;
    }

    public static function clearTable()
    {
        self::validateDefinition();
        return (bool)Db::getInstance()->execute("DELETE FROM `"._DB_PREFIX_.self::$definition['table']."`");
    }

    public static function dropTable()
    {
        self::validateDefinition();
        $table = _DB_PREFIX_.self::$definition['table'];
        $res = (bool)Db::getInstance()->execute("DROP TABLE IF EXISTS `".$table."`");
        $res &= (bool)Db::getInstance()->execute("DROP TABLE IF EXISTS `".$table."_lang`");
        return $res;
    }

    private static function getTypeName($type)
    {
        switch ($type) {
            case self::TYPE_INT:
                return "INT";
                break;
            case self::TYPE_BOOL:
                return "BOOLEAN";
                break;
            case self::TYPE_STRING:
                return "TEXT";
                break;
            case self::TYPE_FLOAT:
                return "FLOAT";
                break;
            case self::TYPE_DATE:
                return "DATE";
                break;
            case self::TYPE_HTML:
                return "TEXT";
                break;
            case self::TYPE_NOTHING:
                return "NULL";
                break;
            case self::TYPE_SQL:
                return "TEXT";
                break;
            default:
                return "TEXT";
                break;
        }
    }

    private static function validateDefinition()
    {
        if (Tools::strlen(self::$definition['table']) == 0) {
            throw new Exception('Invalid table name for '.get_class(self));
        }
        if (Tools::strlen(self::$definition['primary']) == false) {
            throw new Exception('Invalid primary key for '.get_class(self));
        }
        if (is_array(self::$definition['fields']) == false) {
            throw new Exception('Invalid fields array for '.get_class(self));
        }

        return true;
    }
}
