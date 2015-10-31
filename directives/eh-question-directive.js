'use strict';

app.directive('ehQuestionDirective', function ($q, $compile, $templateRequest) {
  var getTemplate = function(question, element) {

    switch(question.questionType) {
      case 1:
        return $templateRequest('directives/text.html', true);
        break;
      case 2:
        return $templateRequest('directives/textarea.html', true);
        break;
      case 3:
        return $templateRequest('directives/list.html', true);
        break;
      case 4:
        return $templateRequest('directives/date.html', true);
        break;
      case 5:
        return $templateRequest('directives/toggle.html', true);
        break;
      case 6:
        return $templateRequest('directives/number.html', true);
        // return $templateCache.get('templates/directive/slider.html');
        break;
      case 7:
        return $q.when("<eh-autocomplete question=\"question\" response=\"response\"></eh-autocomplete>");
        break;
      // case 7:
      //   template = "<eh-learning-box question=\"question\" response=\"response\"></eh-learning-box>";
      //   break;
    }
    return $templateRequest('directives/text.html', true); //Default to a text input if we can't match anything
  };

  var linker = function(scope, element) {
    // console.log('LINKER IS RUNNING');

    getTemplate(scope.question, element)
    .then(function(template){
      // template = template +"<md-divider></md-divider>";
      element.html(template);
      $compile(element.contents())(scope);
    })
  };

  return {
    replace: true,
    restrict: 'E',
    scope: {question:'=',
            questiongroup:'=',
            response:'=',
            patient:'=',
            instance:'='
            },
    link: linker
  };
});
