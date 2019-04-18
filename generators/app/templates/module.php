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

if (!defined('_PS_VERSION_')) {
    exit;
}

class <%= moduleName %> extends Module
{
    public function __construct()
    {
        $this->name = '<%= moduleName %>';
        $this->displayName = $this->l('<%= displayName %>');
        $this->description = $this->l('<%= description %>');
        $this->tab = "<%= tab %>";
        $this->author = '<%= author %>';
        $this->version = '0.1.0';
        $this->ps_versions_compliancy = array('min' => '<%= ps_min_version %>', 'max' => '<%= ps_max_version %>');
        $this->bootstrap = true;

        parent::__construct();
    }

    public function install()
    {
        return parent::install();
    }

    public function uninstall()
    {
        return parent::uninstall();
    }

    public function getContent()
    {
        return 'Code your content here';
    }
}