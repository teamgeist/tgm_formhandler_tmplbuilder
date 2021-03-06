<?php
namespace TGM\TgmFormhandlerTmplbuilder\ViewHelpers;

/*                                                                        *
 * This script is backported from the TYPO3 Flow package "TYPO3.Fluid".   *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU Lesser General Public License, either version 3   *
 *  of the License, or (at your option) any later version.                *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

use TYPO3\CMS\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3\CMS\Fluid\ViewHelpers\Format\StripTagsViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\Facets\CompilableInterface;

/**
 * Removes tags from the given string (applying PHPs strip_tags() function)
 *
 * @see http://www.php.net/manual/function.strip-tags.php
 *
 * = Examples =
 *
 * <code title="default notation">
 * <f:format.stripTags>Some Text with <b>Tags</b> and an &Uuml;mlaut.</f:format.stripTags>
 * </code>
 * <output>
 * Some Text with Tags and an &Uuml;mlaut. (strip_tags() applied. Note: encoded entities are not decoded)
 * </output>
 *
 * <code title="inline notation">
 * {text -> f:format.stripTags()}
 * </code>
 * <output>
 * Text without tags (strip_tags() applied)
 * </output>
 *
 * @api
 */
class BetterStripTagsViewHelper extends StripTagsViewHelper implements CompilableInterface
{
    /**
     * Escapes special characters with their escaped counterparts as needed using PHPs strip_tags() function.
     *
     * @param string $value string to format
     * @param string $allowableTags these tags won't be removed
     * @return mixed
     * @see http://www.php.net/manual/function.strip-tags.php
     * @api
     */
    public function render($value = null, $allowableTags = null)
    {
        return static::renderStatic(
            array(
                'value' => $value,
                'allowableTags' => $allowableTags
            ),
            $this->buildRenderChildrenClosure(),
            $this->renderingContext
        );
    }

    /**
     * Applies strip_tags() on the specified value.
     *
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param \TYPO3\CMS\Fluid\Core\Rendering\RenderingContextInterface $renderingContext
     * @return string
     */
    public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        $value = $arguments['value'];
        if ($value === null) {
            $value = $renderChildrenClosure();
        }
        if (!is_string($value)) {
            return $value;
        }
        return strip_tags($value, $arguments['allowableTags']);
    }
}
