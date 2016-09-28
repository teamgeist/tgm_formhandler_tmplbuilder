##########################################################################
# BASIC FORM SETTINGS
##########################################################################

plugin.tx_tgmformhandlertmplbuilder {

	name = Formular-Namen bitte ändern

	uniqueFormID = COA
	uniqueFormID {

		10 = LOAD_REGISTER
		10 {
			# Ohne Leerzeichen!
			formname = Beispiel
		}

		20 = TEXT
		20.data = {register:formname}

	}

	jsFileFooter {
		1 = EXT:tgm_formhandler_tmplbuilder/Resources/Public/JavaScript/form-functions.js
	}

	cssFile {
		1 = EXT:tgm_formhandler_tmplbuilder/Resources/Public/Css/pitb-form.less
	}

	addErrorAnchors = 0
	formValuesPrefix = formhandler

	isErrorMarker.default = error_class

	errorListTemplate.totalWrap = <div class="error"><strong>Es sind Fehler beim Ausfüllen des Formulars aufgetreten:</strong><ul>|</ul></div>
	errorListTemplate.singleWrap = <li>|</li>

	singleErrorTemplate {
		totalWrap = <div class="alert alert-danger">|</div>
		singleWrap = <span class="message">|</span>
	}

	templateFile = COA
	templateFile {
		5 = FLUIDTEMPLATE
		5 {
			templateName = Form
			partialRootPaths {

				# Standardpfad
				10 = EXT:tgm_formhandler_tmplbuilder/Resources/Private/Partials/Default/Form/

				# Für Formfields von vordefinierten Formulare z.B. "Contact"
				20 = TEXT
				20.data = register:formname
				20.wrap = EXT:tgm_formhandler_tmplbuilder/Resources/Private/Templates/|/

			 	# Für das "Formfields" Partial von eigenen Formularen
			 	30 < .20
			 	30.wrap = {$plugin.tx_tgmformhandlertmplbuilder.customFormPath}|/

				# Überschreibung der DEFAULT Partials in pitb _global
				40 = {$plugin.tx_tgmformhandlertmplbuilder.customPartialPath}Form/

			}
			
			templateRootPaths {

				10 = TEXT
				10.data = register:formname
				10.wrap = EXT:tgm_formhandler_tmplbuilder/Resources/Private/Templates/|/

				20 < .10
				20.wrap = {$plugin.tx_tgmformhandlertmplbuilder.customFormPath}|/

			}
		}

		10 < .5
		10 {

			templateName = Submitted
			partialRootPaths {

				# Standardpfad
				10 = EXT:tgm_formhandler_tmplbuilder/Resources/Private/Partials/Default/Submitted/

				# Überschreibung der DEFAULT Partials in pitb _global
				40 = {$plugin.tx_tgmformhandlertmplbuilder.customPartialPath}Submitted/

			}
		}
	}


	langFile {

		1 = TEXT
		1.value = EXT:tgm_formhandler_tmplbuilder/Resources/Language/shared.xml

		2 = TEXT
		2 {
			data = register:formname
			wrap = EXT:tgm_formhandler_tmplbuilder/Resources/Private/Templates/|/language.xml
		}

		3 < .2
		3.wrap = {$plugin.tx_tgmformhandlertmplbuilder.customFormPath}|/language.xml

	}

	validators.1 {
		class = Tx_Formhandler_Validator_Default
		config {
			fieldConf {

				#email {
				#	errorCheck.1 = required
				#	errorCheck.2 = email
				#}

			}
		}
	}

	finishers.1.class = Tx_Formhandler_Finisher_Mail

	finishers.2 {
		class = Tx_Formhandler_Finisher_SubmittedOK
		config {
			returns = 1
		}
	}
}