<?php
namespace TGM\TgmFormhandlerTmplbuilder\ViewHelpers;

/**
 * ViewHelper zum Wrappen von ChildNodes mit einem Partial
 */

use TYPO3\CMS\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3\CMS\Fluid\Core\ViewHelper\Facets\CompilableInterface;
use TYPO3\CMS\Fluid\ViewHelpers\RenderViewHelper;


class WrapViewHelper extends RenderViewHelper implements CompilableInterface
{
	/**
	 * Renders the content.
	 *
	 * @param array $arguments
	 * @param \Closure $renderChildrenClosure
	 * @param RenderingContextInterface $renderingContext
	 * @return string
	 */
	public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
	{
		$section = $arguments['section'];
		$partial = $arguments['partial'];
		$optional = $arguments['optional'];
		$arguments = static::loadSettingsIntoArguments($arguments['arguments'], $renderingContext);

		$viewHelperVariableContainer = $renderingContext->getViewHelperVariableContainer();
		if ($partial !== null) {
			return preg_replace( '/RENDER_CHILD_NODES_HERE/' , $renderChildrenClosure() , $viewHelperVariableContainer->getView()->renderPartial($partial, $section, $arguments));
		} elseif ($section !== null) {
			return preg_replace( '/RENDER_CHILD_NODES_HERE/' , $renderChildrenClosure() , $viewHelperVariableContainer->getView()->renderSection($section, $arguments, $optional));
		}
		return '';
	}
}