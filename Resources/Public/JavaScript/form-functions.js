$(document).ready(function() {

    initPitbForm();

    if($('.pitb-form-tooltip').length && $.fn.tooltip !== undefined) {
        $('.pitb-form-tooltip').tooltip({
            html: true
        });
    }
});

function initPitbForm() {

    $('.pitb-form-js-notice').hide();

    $('.pitb-form').each(function() {

        var $thisForm = $(this);
        $thisForm.show();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // DATEPICKER
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if($.fn.datepicker !== undefined) {
            $($thisForm).find('input.date').datepicker({
                format: 'dd.mm.yyyy',
                language: 'de',
                startView: 'years',
                endDate: new Date()
            })
            .on('changeDate', function(e) {
                // Revalidate the date field
                $thisForm.formValidation('revalidateField', $(this).attr('name'));
            });
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Formvalidation IO
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $thisForm.formValidation({
            framework: 'bootstrap',
            locale: 'de_DE',
            container: 'tooltip',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            }
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Conditional Logic
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $thisForm.find('*[data-pitb-requires-field]').each(function() {

            var $thisField = $(this);
            var $thisFieldFormgroup = $thisField.parents('.form-group');
            var $showHideContainer = $thisFieldFormgroup;
            var $requiredField = $('*[name="'+$thisField.data('pitb-requires-field')+'"]');
            var $requiredValue = $thisField.data('pitb-requires-value');
            var flagCheckable = false;
            var selector = '*[name="'+$thisField.data('pitb-requires-field')+'"]';

            if(!$thisFieldFormgroup.length) {
                $showHideContainer = $thisField;
            }


            if($requiredField.attr('type') == 'radio' || $requiredField.attr('type') == 'checkbox') {
                flagCheckable = true;
                selector += ':checked';
            }

            if($(selector).val() == $requiredValue) {
                $showHideContainer.show();
            } else {
                $showHideContainer.hide();
            }

            $requiredField.change(function() {

                if($(selector).val() == $requiredValue) {
                    $showHideContainer.show();
                } else {
                    $showHideContainer.hide();
                }

            });
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // "Sonstiges"-Felder
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $('.pitb-sonstiges').focus(function() {

            var $sonstigesRadio = $(this).parents('.input-group').find('.pitb-sonstiges-radio');
            $sonstigesRadio.prop('checked','checked');

            $thisForm.formValidation('updateStatus', $sonstigesRadio.attr('name'), 'NOT_VALIDATED')
                .formValidation('validateField', $sonstigesRadio.attr('name'));
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Conditional Container Validierung
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $thisForm.find('*[data-pitb-requires-area]').each(function() {

            var $thisSection = $(this);
            var $dependSection = $($thisSection.data('pitb-requires-area'));
            var fv = $thisForm.data('formValidation');
            var fieldselector = 'input[required="required"],select[required="required"],textarea[required="required"]';
            var $thisSectionRequiredFields = $thisSection.find(fieldselector);
            var $dependSectionRequiredFields = $dependSection.find(fieldselector);

            $thisSection.find('input,select,textarea').on('change', function() {

                $thisSectionRequiredFields.each(function() {
                    $thisForm.formValidation('enableFieldValidators',$(this).attr('name'),true)
                        .formValidation('updateStatus', $(this).attr('name'), 'NOT_VALIDATED')
                        .formValidation('validateField', $(this).attr('name'));
                });

                $dependSectionRequiredFields.each(function() {
                    $thisForm.formValidation('enableFieldValidators',$(this).attr('name'),true)
                        .formValidation('updateStatus', $(this).attr('name'), 'NOT_VALIDATED')
                        .formValidation('validateField', $(this).attr('name'));
                });

                var thisSectionValid = false;
                var dependSectionValid = false;

                if(fv.isValidContainer($thisSection)) {
                    thisSectionValid = true;
                }

                if(fv.isValidContainer($dependSection)) {
                    dependSectionValid = true;
                }

                if(thisSectionValid && dependSectionValid) {
                    return;
                } else if (thisSectionValid) {
                    $dependSectionRequiredFields.each(function() {
                        $thisForm.formValidation('enableFieldValidators',$(this).attr('name'),false)
                            .formValidation('updateStatus', $(this).attr('name'), 'NOT_VALIDATED')
                            .formValidation('validateField', $(this).attr('name'));
                    });
                } else if(dependSectionValid) {
                    $thisSectionRequiredFields.each(function() {
                        $thisForm.formValidation('enableFieldValidators',$(this).attr('name'),false)
                            .formValidation('updateStatus', $(this).attr('name'), 'NOT_VALIDATED')
                            .formValidation('validateField', $(this).attr('name'));
                    });
                }

            });

        });

    });
}