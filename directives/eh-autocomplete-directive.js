// Typing into input performs typeahead over known answers.
// Allows entry of new (not previously known) values.
// Removes response.answer UNLESS the answer is selected from typeahead, in which case, it will be updated.

// Click button to temporarily hide input + show select.
// On selection of select option, update input value, hide select+show input.

// If value of input matches known option, store response.answer.
// If value of input does NOT match known option, store response.value.

// Before display, we need to populate value + answer if there's an existing answer. questionType == 7?

app.directive('ehAutocomplete', function () {
  return {
    // scope:{
    //   question:'=',
    //   response:'=',
    //   change:'='
    // },
    templateUrl: '/directives/ac.html',
    restrict: 'E',
    link: function(scope,iElem,iAttrs, $log) {

    scope.matches = matches;
    scope.selectedItem = scope.response.Answer;// ? scope.response.Answer : scope.response.response ? {_id:'xxx',name:scope.response.response}: undefined;
    scope.searchText = scope.response.response;
    scope.selectedItemChange = selectedItemChange;
    scope.searchTextChange   = searchTextChange;

    function byIx(a,b){
       if (a.ix < b.ix) {
        return -1;
      }
      if (a.ix > b.ix) {
        return 1;
      }
      return 0;
     }

    function byAnswerLC(a,b){
      if (a.answer.name.toLowerCase() < b.answer.name.toLowerCase()) {
        return -1;
      }
      if (a.answer.name.toLowerCase() > b.answer.name.toLowerCase()) {
        return 1;
      }
      return 0;
    }

    function reduceForQuery(query, array){
      var lowercaseQuery = query.toLowerCase();
      return array.reduce(function(ac,i){
        var ix = i.name.toLowerCase().indexOf(lowercaseQuery);
        if(ix > -1){
          ac.push({answer:i , ix:ix})
        }
        return ac;
      },[])
    }

    function findMatches(query){

      return reduceForQuery(query, scope.question.Answers)
      // .sort(byAnswerLC) //If there were a bunch of very similar entries, this might help, but in the meantime, turn it off.
      .sort(byIx)
      .map(function(result){
        return result.answer;
      });
    }

    function matches(query){
        var m = query ? findMatches(query) : scope.question.CommonAnswers;
        return m
    }

    function searchTextChange(text) {
      scope.response.response = text;
      // console.log('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      scope.response.Answer = item;
      delete scope.response.response;
      // console.log('Response after selectedItemChange',scope.response.Answer._id);
    }

  }
}
});
