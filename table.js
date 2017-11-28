/*jslint
    node: true
*/

/*eslint-env
    browser,
    node
*/

(function () {
    'use strict';

    var TableUtils = (function () {
        function TableUtils() { }
        
        TableUtils.createTableInPlaceHolder = function (placeHolderId, width, border, borderColor, borderCollapse) {
            var table = document.createElement('table'),
                tbody = document.createElement('tbody'),
                placeHolderNode = document.getElementById(placeHolderId);
            
            table.style.width = typeof width !== 'undefined' ? width : '100%';
            table.setAttribute('border', typeof border !== 'undefined' ? border : '1');
            table.setAttribute('bordercolor', typeof borderColor !== 'undefined' ? borderColor : 'LightSlateGray');
            table.style.borderCollapse = typeof borderCollapse !== 'undefined' ? borderCollapse : 'collapse';
            
            table.appendChild(tbody);
            
            while (placeHolderNode.firstChild) {
                placeHolderNode.removeChild(placeHolderNode.firstChild);
            }
            placeHolderNode.appendChild(table);
            
            return table;
        };
        
        TableUtils.createRowWithCellValuesInTable = function (table, cellValues) {
            var tr = document.createElement('tr'),
                tbody = table.tBodies[0];
            cellValues.map(function (cellValue) {
                TableUtils.createCellWithContentInRow(tr, cellValue);
            });
            tbody.appendChild(tr);
            return tr;
        };
        
        TableUtils.createRowWithCellsInTable = function (table, cells) {
            var tr = document.createElement('tr'),
                tbody = table.tBodies[0];
            cells.map(function (cell) {
                tr.appendChild(cell);
            });
            tbody.appendChild(tr);
            return tr;
        };
        
        TableUtils.createCellWithContent = function (htmlContent, cssClass, colSpan) {
            var td = document.createElement('td'),
                div = document.createElement('div');
            
            if (typeof htmlContent !== 'undefined') {
                div.innerHTML = htmlContent;
            }
            
            if (typeof cssClass !== 'undefined') {
                div.setAttribute('class', cssClass);
            }
            
            if (colSpan !== null) {
                td.colSpan = colSpan;
            }

            td.appendChild(div);
            
            return td;
        };
        
        TableUtils.createCellWithContentInRow = function (row, htmlContent, cssClass, colSpan) {
            var td = TableUtils.createCellWithContent(htmlContent, cssClass, colSpan);
            row.appendChild(td);
            return td;
        };
        
        return TableUtils;
    }());

    if (typeof window === 'undefined') {
        module.exports = TableUtils;
    } else {
        window.TableUtils = TableUtils;
    }

}());
