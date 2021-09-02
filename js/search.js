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
// 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aGVtZXMvaGV4by10aGVtZS1heWVyL3NvdXJjZS9qcy9zZWFyY2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSSxVQUFVLEdBQUcsU0FBYixVQUFhLENBQVUsSUFBVixFQUFnQixTQUFoQixFQUEyQixVQUEzQixFQUF1QztBQUN0RDs7QUFDQSxNQUFJLEdBQUcsR0FBRyxvRkFBVjtBQUNBLEVBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTztBQUNMLElBQUEsR0FBRyxFQUFFLElBREE7QUFFTCxJQUFBLFFBQVEsRUFBRSxLQUZMO0FBR0wsSUFBQSxPQUFPLEVBQUUsaUJBQVUsV0FBVixFQUF1QjtBQUM5QjtBQUNBLFVBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFELEVBQVUsV0FBVixDQUFELENBQXdCLEdBQXhCLENBQTRCLFlBQVk7QUFDbEQsZUFBTztBQUNMLFVBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFELEVBQVUsSUFBVixDQUFELENBQWlCLElBQWpCLEVBREY7QUFFTCxVQUFBLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBRCxFQUFZLElBQVosQ0FBRCxDQUFtQixJQUFuQixFQUZKO0FBR0wsVUFBQSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUQsRUFBUSxJQUFSLENBQUQsQ0FBZSxJQUFmO0FBSEEsU0FBUDtBQUtELE9BTlcsRUFNVCxHQU5TLEVBQVo7QUFRQSxVQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixTQUF4QixDQUFiO0FBQ0EsVUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBckI7QUFFQSxNQUFBLE1BQU0sQ0FBQyxn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QUFhLEdBQUcsT0FBTyxDQUFDLE1BQVIsQ0FBZSxLQUFmLEVBQXNCLEdBQXRCLENBQXBCLENBakJvQixDQW1CcEI7O0FBQ0EsY0FBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixVQUFVLE9BQVYsRUFBbUI7QUFDbEMsb0JBQUksSUFBSSxHQUFHLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsSUFBcEIsQ0FBWDtBQUNBLGdCQUFBLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBZCxDQUFzQixJQUF0QixFQUE0QixrQ0FBa0MsT0FBbEMsR0FBNEMsT0FBeEUsQ0FBaEI7QUFDRCxlQUhEO0FBS0EsY0FBQSxHQUFHLElBQUksZ0NBQWdDLGFBQWhDLEdBQWdELFNBQXZEO0FBQ0Q7O0FBQ0QsWUFBQSxHQUFHLElBQUksT0FBUDtBQUNEO0FBQ0YsU0FsRUQ7QUFtRUEsUUFBQSxHQUFHLElBQUksT0FBUDs7QUFDQSxZQUFJLEdBQUcsQ0FBQyxPQUFKLENBQVksTUFBWixNQUF3QixDQUFDLENBQTdCLEVBQWdDO0FBQzlCLGlCQUFPLGNBQWMsQ0FBQyxTQUFmLEdBQTJCLEdBQUcsR0FBRyxnR0FBeEM7QUFDRDs7QUFDRCxRQUFBLGNBQWMsQ0FBQyxTQUFmLEdBQTJCLEdBQUcsR0FBRyxHQUFqQztBQUNELE9BaEZEO0FBaUZEO0FBakdJLEdBQVA7QUFtR0EsRUFBQSxDQUFDLENBQUMsUUFBRCxDQUFELENBQVksRUFBWixDQUFlLE9BQWYsRUFBd0IscUJBQXhCLEVBQStDLFlBQVk7QUFDekQsSUFBQSxDQUFDLENBQUMscUJBQUQsQ0FBRCxDQUF5QixHQUF6QixDQUE2QixFQUE3QjtBQUNBLElBQUEsQ0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEIsSUFBMUIsQ0FBK0IsRUFBL0I7QUFDRCxHQUhEO0FBSUQsQ0ExR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBBIGxvY2FsIHNlYXJjaCBzY3JpcHQgd2l0aCB0aGUgaGVscCBvZiBbaGV4by1nZW5lcmF0b3Itc2VhcmNoXShodHRwczovL2dpdGh1Yi5jb20vUGFpY0h5cGVyaW9uRGV2L2hleG8tZ2VuZXJhdG9yLXNlYXJjaClcbi8vIENvcHlyaWdodCAoQykgMjAxNSBcbi8vIEpvc2VwaCBQYW4gPGh0dHA6Ly9naXRodWIuY29tL3d6cGFuPlxuLy8gU2h1aGFvIE1hbyA8aHR0cDovL2dpdGh1Yi5jb20vbWFvc2h1aGFvPlxuLy8gVGhpcyBsaWJyYXJ5IGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMi4xIG9mIHRoZVxuLy8gTGljZW5zZSwgb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbi8vIFxuLy8gVGhpcyBsaWJyYXJ5IGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsIGJ1dFxuLy8gV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZSBHTlVcbi8vIExlc3NlciBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vLyBcbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBMZXNzZXIgR2VuZXJhbCBQdWJsaWNcbi8vIExpY2Vuc2UgYWxvbmcgd2l0aCB0aGlzIGxpYnJhcnk7IGlmIG5vdCwgd3JpdGUgdG8gdGhlIEZyZWUgU29mdHdhcmVcbi8vIEZvdW5kYXRpb24sIEluYy4sIDUxIEZyYW5rbGluIFN0cmVldCwgRmlmdGggRmxvb3IsIEJvc3RvbiwgTUFcbi8vIDAyMTEwLTEzMDEgVVNBXG4vLyBcblxudmFyIHNlYXJjaEZ1bmMgPSBmdW5jdGlvbiAocGF0aCwgc2VhcmNoX2lkLCBjb250ZW50X2lkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIEJUTiA9IFwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdsb2NhbC1zZWFyY2gtY2xvc2UnIGlkPSdsb2NhbC1zZWFyY2gtY2xvc2UnPjwvYnV0dG9uPlwiO1xuICAkLmFqYXgoe1xuICAgIHVybDogcGF0aCxcbiAgICBkYXRhVHlwZTogXCJ4bWxcIixcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAoeG1sUmVzcG9uc2UpIHtcbiAgICAgIC8vIGdldCB0aGUgY29udGVudHMgZnJvbSBzZWFyY2ggZGF0YVxuICAgICAgdmFyIGRhdGFzID0gJChcImVudHJ5XCIsIHhtbFJlc3BvbnNlKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRpdGxlOiAkKFwidGl0bGVcIiwgdGhpcykudGV4dCgpLFxuICAgICAgICAgIGNvbnRlbnQ6ICQoXCJjb250ZW50XCIsIHRoaXMpLnRleHQoKSxcbiAgICAgICAgICB1cmw6ICQoXCJ1cmxcIiwgdGhpcykudGV4dCgpXG4gICAgICAgIH07XG4gICAgICB9KS5nZXQoKTtcblxuICAgICAgdmFyICRpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlYXJjaF9pZCk7XG4gICAgICB2YXIgJHJlc3VsdENvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250ZW50X2lkKTtcblxuICAgICAgJGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3RyID0gJzx1bCBjbGFzcz1cInNlYXJjaC1yZXN1bHQtbGlzdFwiPic7XG4gICAgICAgIHZhciBrZXl3b3JkcyA9IHRoaXMudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1tcXHNdKy8pO1xuICAgICAgICAkcmVzdWx0Q29udGVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBpZiAodGhpcy52YWx1ZS50cmltKCkubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGVyZm9ybSBsb2NhbCBzZWFyY2hpbmdcbiAgICAgICAgZGF0YXMuZm9yRWFjaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHZhciBpc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAvLyB2YXIgY29udGVudF9pbmRleCA9IFtdO1xuICAgICAgICAgIGlmICghZGF0YS50aXRsZSB8fCBkYXRhLnRpdGxlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIGRhdGEudGl0bGUgPSBcIlVudGl0bGVkXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkYXRhX3RpdGxlID0gZGF0YS50aXRsZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB2YXIgZGF0YV9jb250ZW50ID0gZGF0YS5jb250ZW50LnRyaW0oKS5yZXBsYWNlKC88W14+XSs+L2csIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgdmFyIGRhdGFfdXJsID0gZGF0YS51cmw7XG4gICAgICAgICAgdmFyIGluZGV4X3RpdGxlID0gLTE7XG4gICAgICAgICAgdmFyIGluZGV4X2NvbnRlbnQgPSAtMTtcbiAgICAgICAgICB2YXIgZmlyc3Rfb2NjdXIgPSAtMTtcbiAgICAgICAgICAvLyBvbmx5IG1hdGNoIGFydGlsZXMgd2l0aCBub3QgZW1wdHkgY29udGVudHNcbiAgICAgICAgICBpZiAoZGF0YV9jb250ZW50ICE9PSAnJykge1xuICAgICAgICAgICAga2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbiAoa2V5d29yZCwgaSkge1xuICAgICAgICAgICAgICBpbmRleF90aXRsZSA9IGRhdGFfdGl0bGUuaW5kZXhPZihrZXl3b3JkKTtcbiAgICAgICAgICAgICAgaW5kZXhfY29udGVudCA9IGRhdGFfY29udGVudC5pbmRleE9mKGtleXdvcmQpO1xuXG4gICAgICAgICAgICAgIGlmIChpbmRleF90aXRsZSA8IDAgJiYgaW5kZXhfY29udGVudCA8IDApIHtcbiAgICAgICAgICAgICAgICBpc01hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4X2NvbnRlbnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICBpbmRleF9jb250ZW50ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgZmlyc3Rfb2NjdXIgPSBpbmRleF9jb250ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb250ZW50X2luZGV4LnB1c2goe2luZGV4X2NvbnRlbnQ6aW5kZXhfY29udGVudCwga2V5d29yZF9sZW46a2V5d29yZF9sZW59KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gc2hvdyBzZWFyY2ggcmVzdWx0c1xuICAgICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgICBzdHIgKz0gXCI8bGk+PGEgaHJlZj0nXCIgKyBkYXRhX3VybCArIFwiJyBjbGFzcz0nc2VhcmNoLXJlc3VsdC10aXRsZSc+XCIgKyBkYXRhX3RpdGxlICsgXCI8L2E+XCI7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGRhdGEuY29udGVudC50cmltKCkucmVwbGFjZSgvPFtePl0rPi9nLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9vY2N1ciA+PSAwKSB7XG4gICAgICAgICAgICAgIC8vIGN1dCBvdXQgMTAwIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gZmlyc3Rfb2NjdXIgLSAyMDtcbiAgICAgICAgICAgICAgdmFyIGVuZCA9IGZpcnN0X29jY3VyICsgODA7XG5cbiAgICAgICAgICAgICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gMDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChzdGFydCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZW5kID0gMTAwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVuZCA+IGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZW5kID0gY29udGVudC5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgbWF0Y2hfY29udGVudCA9IGNvbnRlbnQuc3Vic3RyKHN0YXJ0LCBlbmQpO1xuXG4gICAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBhbGwga2V5d29yZHNcbiAgICAgICAgICAgICAga2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgICAgICAgICAgICAgIHZhciByZWdTID0gbmV3IFJlZ0V4cChrZXl3b3JkLCBcImdpXCIpO1xuICAgICAgICAgICAgICAgIG1hdGNoX2NvbnRlbnQgPSBtYXRjaF9jb250ZW50LnJlcGxhY2UocmVnUywgXCI8ZW0gY2xhc3M9XFxcInNlYXJjaC1rZXl3b3JkXFxcIj5cIiArIGtleXdvcmQgKyBcIjwvZW0+XCIpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBzdHIgKz0gXCI8cCBjbGFzcz1cXFwic2VhcmNoLXJlc3VsdFxcXCI+XCIgKyBtYXRjaF9jb250ZW50ICsgXCIuLi48L3A+XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBcIjwvbGk+XCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3RyICs9IFwiPC91bD5cIjtcbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCc8bGk+JykgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuICRyZXN1bHRDb250ZW50LmlubmVySFRNTCA9IEJUTiArIFwiPGRpdiBjbGFzcz1cXFwic2VhcmNoLXJlc3VsdC1lbXB0eVxcXCI+PHA+PGkgY2xhc3M9XFxcImZlIGZlLXRpcmVkXFxcIj48L2k+IOayoeacieaJvuWIsOWGheWuue+8jOabtOaNouS4i+aQnOe0ouivjeivleivleWQp348cD48L2Rpdj5cIjtcbiAgICAgICAgfVxuICAgICAgICAkcmVzdWx0Q29udGVudC5pbm5lckhUTUwgPSBCVE4gKyBzdHI7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2xvY2FsLXNlYXJjaC1jbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjbG9jYWwtc2VhcmNoLWlucHV0JykudmFsKCcnKTtcbiAgICAkKCcjbG9jYWwtc2VhcmNoLXJlc3VsdCcpLmh0bWwoJycpO1xuICB9KTtcbn07Il19
