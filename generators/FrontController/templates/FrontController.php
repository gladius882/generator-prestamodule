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

class <%= moduleName %><%= fileName %>ModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        $this->context->smarty->assign(array(
              '' => ''
            )
        );

        $this->setTemplate('module:<%= moduleName %>/views/templates/front/template.tpl');
    }
}