(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// A local search script with the help of [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)
// Copyright (C) 2015 
// Joseph Pan <http://github.com/wzpan>
// Shuhao Mao <http://github.com/maoshuhao>
// This library is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation; either version 2.1 of the
// License, or (at your option) any later version.
// 
// This library is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
// 02110-1301 USA
var searchFunc = function searchFunc(path, search_id, content_id) {
  'use strict';

  var BTN = "<button type='button' class='local-search-close' id='local-search-close'></button>";
  $.ajax({
    url: path,
    dataType: "xml",
    success: function success(xmlResponse) {
      // get the contents from search data
      var datas = $("entry", xmlResponse).map(function () {
        return {
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("url", this).text()
        };
      }).get();
      var $input = document.getElementById(search_id);
      var $resultContent = document.getElementById(content_id);
      $input.addEventListener('input', function () {
        var str = '<ul class="search-result-list">';
        var keywords = this.value.trim().toLowerCase().split(/[\s]+/);
        $resultContent.innerHTML = "";

        if (this.value.trim().length <= 0) {
          return;
        } // perform local searching


        datas.forEach(function (data) {
          var isMatch = true; // var content_index = [];

          if (!data.title || data.title.trim() === '') {
            data.title = "Untitled";
          }

          var data_title = data.title.trim().toLowerCase();
          var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1; // only match artiles with not empty contents

          if (data_content !== '') {
            keywords.forEach(function (keyword, i) {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0) {
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }

                if (i == 0) {
                  first_occur = index_content;
                } // content_index.push({index_content:index_content, keyword_len:keyword_len});

              }
            });
          } else {
            isMatch = false;
          } // show search results


          if (isMatch) {
            str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
            var content = data.content.trim().replace(/<[^>]+>/g, "");

            if (first_occur >= 0) {
              // cut out 100 characters
              var start = first_occur - 20;
              var end = first_occur + 80;

              if (start < 0) {
                start = 0;
              }

              if (start == 0) {
                end = 100;
              }

              if (end > content.length) {
                end = content.length;
              }

              var match_content = content.substr(start, end); // highlight all keywords

              keywords.forEach(function (keyword) {
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
              });
              str += "<p class=\"search-result\">" + match_content + "...</p>";
            }

            str += "</li>";
          }
        });
        str += "</ul>";

        if (str.indexOf('<li>') === -1) {
          return $resultContent.innerHTML = BTN + "<div class=\"search-result-empty\"><p><i class=\"fe fe-tired\"></i> 没有找到内容，更换下搜索词试试吧~<p></div>";
        }

        $resultContent.innerHTML = BTN + str;
      });
    }
  });
  $(document).on('click', '#local-search-close', function () {
    $('#local-search-input').val('');
    $('#local-search-result').html('');
  });
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvaGV4by10aGVtZS1heWVyL3NvdXJjZS9qcy9zZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUksVUFBVSxHQUFHLFNBQWIsVUFBYSxDQUFVLElBQVYsRUFBZ0IsU0FBaEIsRUFBMkIsVUFBM0IsRUFBdUM7QUFDdEQ7O0FBQ0EsTUFBSSxHQUFHLEdBQUcsb0ZBQVY7QUFDQSxFQUFBLENBQUMsQ0FBQyxJQUFGLENBQU87QUFDTCxJQUFBLEdBQUcsRUFBRSxJQURBO0FBRUwsSUFBQSxRQUFRLEVBQUUsS0FGTDtBQUdMLElBQUEsT0FBTyxFQUFFLGlCQUFVLFdBQVYsRUFBdUI7QUFDOUI7QUFDQSxVQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBRCxFQUFVLFdBQVYsQ0FBRCxDQUF3QixHQUF4QixDQUE0QixZQUFZO0FBQ2xELGVBQU87QUFDTCxVQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBRCxFQUFVLElBQVYsQ0FBRCxDQUFpQixJQUFqQixFQURGO0FBRUwsVUFBQSxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQUQsRUFBWSxJQUFaLENBQUQsQ0FBbUIsSUFBbkIsRUFGSjtBQUdMLFVBQUEsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFELEVBQVEsSUFBUixDQUFELENBQWUsSUFBZjtBQUhBLFNBQVA7QUFLRCxPQU5XLEVBTVQsR0FOUyxFQUFaO0FBUUEsVUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBYjtBQUNBLFVBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCLENBQXJCO0FBRUEsTUFBQSxNQUFNLENBQUMsZ0JBQVAs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QUFHLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBZixFQUFzQixHQUF0QixDQUFwQixDQWpCb0IsQ0FtQnBCOztBQUNBLGNBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsVUFBVSxPQUFWLEVBQW1CO0FBQ2xDLG9CQUFJLElBQUksR0FBRyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLElBQXBCLENBQVg7QUFDQSxnQkFBQSxhQUFhLEdBQUcsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsSUFBdEIsRUFBNEIsa0NBQWtDLE9BQWxDLEdBQTRDLE9BQXhFLENBQWhCO0FBQ0QsZUFIRDtBQUtBLGNBQUEsR0FBRyxJQUFJLGdDQUFnQyxhQUFoQyxHQUFnRCxTQUF2RDtBQUNEOztBQUNELFlBQUEsR0FBRyxJQUFJLE9BQVA7QUFDRDtBQUNGLFNBbEVEO0FBbUVBLFFBQUEsR0FBRyxJQUFJLE9BQVA7O0FBQ0EsWUFBSSxHQUFHLENBQUMsT0FBSixDQUFZLE1BQVosTUFBd0IsQ0FBQyxDQUE3QixFQUFnQztBQUM5QixpQkFBTyxjQUFjLENBQUMsU0FBZixHQUEyQixHQUFHLEdBQUcsZ0dBQXhDO0FBQ0Q7O0FBQ0QsUUFBQSxjQUFjLENBQUMsU0FBZixHQUEyQixHQUFHLEdBQUcsR0FBakM7QUFDRCxPQWhGRDtBQWlGRDtBQWpHSSxHQUFQO0FBbUdBLEVBQUEsQ0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHFCQUF4QixFQUErQyxZQUFZO0FBQ3pELElBQUEsQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUIsR0FBekIsQ0FBNkIsRUFBN0I7QUFDQSxJQUFBLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCLElBQTFCLENBQStCLEVBQS9CO0FBQ0QsR0FIRDtBQUlELENBMUdEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQSBsb2NhbCBzZWFyY2ggc2NyaXB0IHdpdGggdGhlIGhlbHAgb2YgW2hleG8tZ2VuZXJhdG9yLXNlYXJjaF0oaHR0cHM6Ly9naXRodWIuY29tL1BhaWNIeXBlcmlvbkRldi9oZXhvLWdlbmVyYXRvci1zZWFyY2gpXG4vLyBDb3B5cmlnaHQgKEMpIDIwMTUgXG4vLyBKb3NlcGggUGFuIDxodHRwOi8vZ2l0aHViLmNvbS93enBhbj5cbi8vIFNodWhhbyBNYW8gPGh0dHA6Ly9naXRodWIuY29tL21hb3NodWhhbz5cbi8vIFRoaXMgbGlicmFyeSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4vLyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIuMSBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vLyBcbi8vIFRoaXMgbGlicmFyeSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLCBidXRcbi8vIFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2Zcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGUgR05VXG4vLyBMZXNzZXIgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuLy8gXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgTGVzc2VyIEdlbmVyYWwgUHVibGljXG4vLyBMaWNlbnNlIGFsb25nIHdpdGggdGhpcyBsaWJyYXJ5OyBpZiBub3QsIHdyaXRlIHRvIHRoZSBGcmVlIFNvZnR3YXJlXG4vLyBGb3VuZGF0aW9uLCBJbmMuLCA1MSBGcmFua2xpbiBTdHJlZXQsIEZpZnRoIEZsb29yLCBCb3N0b24sIE1BXG4vLyAwMjExMC0xMzAxIFVTQVxuXG52YXIgc2VhcmNoRnVuYyA9IGZ1bmN0aW9uIChwYXRoLCBzZWFyY2hfaWQsIGNvbnRlbnRfaWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgQlROID0gXCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2xvY2FsLXNlYXJjaC1jbG9zZScgaWQ9J2xvY2FsLXNlYXJjaC1jbG9zZSc+PC9idXR0b24+XCI7XG4gICQuYWpheCh7XG4gICAgdXJsOiBwYXRoLFxuICAgIGRhdGFUeXBlOiBcInhtbFwiLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh4bWxSZXNwb25zZSkge1xuICAgICAgLy8gZ2V0IHRoZSBjb250ZW50cyBmcm9tIHNlYXJjaCBkYXRhXG4gICAgICB2YXIgZGF0YXMgPSAkKFwiZW50cnlcIiwgeG1sUmVzcG9uc2UpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGl0bGU6ICQoXCJ0aXRsZVwiLCB0aGlzKS50ZXh0KCksXG4gICAgICAgICAgY29udGVudDogJChcImNvbnRlbnRcIiwgdGhpcykudGV4dCgpLFxuICAgICAgICAgIHVybDogJChcInVybFwiLCB0aGlzKS50ZXh0KClcbiAgICAgICAgfTtcbiAgICAgIH0pLmdldCgpO1xuXG4gICAgICB2YXIgJGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VhcmNoX2lkKTtcbiAgICAgIHZhciAkcmVzdWx0Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRlbnRfaWQpO1xuXG4gICAgICAkaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHIgPSAnPHVsIGNsYXNzPVwic2VhcmNoLXJlc3VsdC1saXN0XCI+JztcbiAgICAgICAgdmFyIGtleXdvcmRzID0gdGhpcy52YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKS5zcGxpdCgvW1xcc10rLyk7XG4gICAgICAgICRyZXN1bHRDb250ZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlLnRyaW0oKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBwZXJmb3JtIGxvY2FsIHNlYXJjaGluZ1xuICAgICAgICBkYXRhcy5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdmFyIGlzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgIC8vIHZhciBjb250ZW50X2luZGV4ID0gW107XG4gICAgICAgICAgaWYgKCFkYXRhLnRpdGxlIHx8IGRhdGEudGl0bGUudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgZGF0YS50aXRsZSA9IFwiVW50aXRsZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGRhdGFfdGl0bGUgPSBkYXRhLnRpdGxlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHZhciBkYXRhX2NvbnRlbnQgPSBkYXRhLmNvbnRlbnQudHJpbSgpLnJlcGxhY2UoLzxbXj5dKz4vZywgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB2YXIgZGF0YV91cmwgPSBkYXRhLnVybDtcbiAgICAgICAgICB2YXIgaW5kZXhfdGl0bGUgPSAtMTtcbiAgICAgICAgICB2YXIgaW5kZXhfY29udGVudCA9IC0xO1xuICAgICAgICAgIHZhciBmaXJzdF9vY2N1ciA9IC0xO1xuICAgICAgICAgIC8vIG9ubHkgbWF0Y2ggYXJ0aWxlcyB3aXRoIG5vdCBlbXB0eSBjb250ZW50c1xuICAgICAgICAgIGlmIChkYXRhX2NvbnRlbnQgIT09ICcnKSB7XG4gICAgICAgICAgICBrZXl3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChrZXl3b3JkLCBpKSB7XG4gICAgICAgICAgICAgIGluZGV4X3RpdGxlID0gZGF0YV90aXRsZS5pbmRleE9mKGtleXdvcmQpO1xuICAgICAgICAgICAgICBpbmRleF9jb250ZW50ID0gZGF0YV9jb250ZW50LmluZGV4T2Yoa2V5d29yZCk7XG5cbiAgICAgICAgICAgICAgaWYgKGluZGV4X3RpdGxlIDwgMCAmJiBpbmRleF9jb250ZW50IDwgMCkge1xuICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhfY29udGVudCA8IDApIHtcbiAgICAgICAgICAgICAgICAgIGluZGV4X2NvbnRlbnQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICBmaXJzdF9vY2N1ciA9IGluZGV4X2NvbnRlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnRlbnRfaW5kZXgucHVzaCh7aW5kZXhfY29udGVudDppbmRleF9jb250ZW50LCBrZXl3b3JkX2xlbjprZXl3b3JkX2xlbn0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBzaG93IHNlYXJjaCByZXN1bHRzXG4gICAgICAgICAgaWYgKGlzTWF0Y2gpIHtcbiAgICAgICAgICAgIHN0ciArPSBcIjxsaT48YSBocmVmPSdcIiArIGRhdGFfdXJsICsgXCInIGNsYXNzPSdzZWFyY2gtcmVzdWx0LXRpdGxlJz5cIiArIGRhdGFfdGl0bGUgKyBcIjwvYT5cIjtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gZGF0YS5jb250ZW50LnRyaW0oKS5yZXBsYWNlKC88W14+XSs+L2csIFwiXCIpO1xuICAgICAgICAgICAgaWYgKGZpcnN0X29jY3VyID49IDApIHtcbiAgICAgICAgICAgICAgLy8gY3V0IG91dCAxMDAgY2hhcmFjdGVyc1xuICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBmaXJzdF9vY2N1ciAtIDIwO1xuICAgICAgICAgICAgICB2YXIgZW5kID0gZmlyc3Rfb2NjdXIgKyA4MDtcblxuICAgICAgICAgICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSAwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHN0YXJ0ID09IDApIHtcbiAgICAgICAgICAgICAgICBlbmQgPSAxMDA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZW5kID4gY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlbmQgPSBjb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBtYXRjaF9jb250ZW50ID0gY29udGVudC5zdWJzdHIoc3RhcnQsIGVuZCk7XG5cbiAgICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGFsbCBrZXl3b3Jkc1xuICAgICAgICAgICAgICBrZXl3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChrZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ1MgPSBuZXcgUmVnRXhwKGtleXdvcmQsIFwiZ2lcIik7XG4gICAgICAgICAgICAgICAgbWF0Y2hfY29udGVudCA9IG1hdGNoX2NvbnRlbnQucmVwbGFjZShyZWdTLCBcIjxlbSBjbGFzcz1cXFwic2VhcmNoLWtleXdvcmRcXFwiPlwiICsga2V5d29yZCArIFwiPC9lbT5cIik7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIHN0ciArPSBcIjxwIGNsYXNzPVxcXCJzZWFyY2gtcmVzdWx0XFxcIj5cIiArIG1hdGNoX2NvbnRlbnQgKyBcIi4uLjwvcD5cIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IFwiPC9saT5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdHIgKz0gXCI8L3VsPlwiO1xuICAgICAgICBpZiAoc3RyLmluZGV4T2YoJzxsaT4nKSA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gJHJlc3VsdENvbnRlbnQuaW5uZXJIVE1MID0gQlROICsgXCI8ZGl2IGNsYXNzPVxcXCJzZWFyY2gtcmVzdWx0LWVtcHR5XFxcIj48cD48aSBjbGFzcz1cXFwiZmUgZmUtdGlyZWRcXFwiPjwvaT4g5rKh5pyJ5om+5Yiw5YaF5a6577yM5pu05o2i5LiL5pCc57Si6K+N6K+V6K+V5ZCnfjxwPjwvZGl2PlwiO1xuICAgICAgICB9XG4gICAgICAgICRyZXN1bHRDb250ZW50LmlubmVySFRNTCA9IEJUTiArIHN0cjtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjbG9jYWwtc2VhcmNoLWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICQoJyNsb2NhbC1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAgICQoJyNsb2NhbC1zZWFyY2gtcmVzdWx0JykuaHRtbCgnJyk7XG4gIH0pO1xufTsiXX0=
