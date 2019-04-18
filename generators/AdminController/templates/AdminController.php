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
 * @author    <%= author %>
 * @copyright <%= year %> <%= author %>
 * @license   LICENSE.txt
 */

class Admin<%= className %>Controller extends ModuleAdminController
{
    protected $position_identifier = 'id_';

    public function __construct()
    {
        parent::__construct();
    }

    public function renderList()
    {
        $this->className = '';
        $this->table = '';
        $this->list_id = '';
        $this->identifier = '';
        $this->_defaultOrderBy = "";
        $this->_orderWay = "";
        
        $this->_select = '';
        $this->_join = '';
        $this->_where = '';

        $this->fields_list = array(
            'label' => array(
                'title' => '',
                'width' => 'auto',
                'filter_key' => ''
            )
        );

        return parent::renderList();
    }
}
