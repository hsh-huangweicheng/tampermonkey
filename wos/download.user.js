(function() {
  "use strict";
  let BATCH_COUNT = 500;

  function getLocalRange() {
    try {
      return JSON.parse(localStorage.getItem("range"));
    } catch (e) {
      return null;
    }
  }

  document.addEventListener(
    "click",
    e => {
      switch (e.srcElement.id) {
        case "exportButton":
          const markFrom = +document.querySelector("#markFrom").value;
          const markTo = +document.querySelector("#markTo").value;
          BATCH_COUNT = markTo - markFrom + 1;

          const range = {
            markFrom: markFrom + BATCH_COUNT,
            markTo: markTo + BATCH_COUNT
          };
          console.log("change range", range);
          localStorage.setItem("range", JSON.stringify(range));
          break;
        case "exportTypeName":
          configDialog();
          break;
      }

      if (e.srcElement.classList.contains("exportIconButton")) {
        configDialog();
      }
      if (e.srcElement.classList.contains("quickoutput-cancel-action")) {
        configDialog();
      }
    },
    true
  );

  function configDialog() {
    setTimeout(() => {
      //导出为其他文件格式
      $("#exportTypeName,.exportIconButton").click();
      // 记录来源
      $("#numberOfRecordsRange").click();

      const range = getLocalRange();
      if (range) {
        document.querySelector("#markFrom").value = range.markFrom;
        document.querySelector("#markTo").value = range.markTo;
      }

      document.querySelector("#bib_fields").value = document.querySelector("#bib_fields option:last-child").value;
      document.querySelector("#saveOptions").value = "fieldtagged";
    });
  }
})();
