/* Tabulator v4.9.1 (c) Oliver Folkerd */

var ResponsiveLayout = function ResponsiveLayout(table) {
	this.table = table; //hold Tabulator object
	this.columns = [];
	this.hiddenColumns = [];
	this.mode = "";
	this.index = 0;
	this.collapseFormatter = [];
	this.collapseStartOpen = true;
	this.collapseHandleColumn = false;
};

//generate resposive columns list
ResponsiveLayout.prototype.initialize = function () {
	var self = this,
	    columns = [];

	this.mode = this.table.options.responsiveLayout;
	this.collapseFormatter = this.table.options.responsiveLayoutCollapseFormatter || this.formatCollapsedData;
	this.collapseStartOpen = this.table.options.responsiveLayoutCollapseStartOpen;
	this.hiddenColumns = [];

	//detemine level of responsivity for each column
	this.table.columnManager.columnsByIndex.forEach(function (column, i) {
		if (column.modules.responsive) {
			if (column.modules.responsive.order && column.modules.responsive.visible) {
				column.modules.responsive.index = i;
				columns.push(column);

				if (!column.visible && self.mode === "collapse") {
					self.hiddenColumns.push(column);
				}
			}
		}
	});

	//sort list by responsivity
	columns = columns.reverse();
	columns = columns.sort(function (a, b) {
		var diff = b.modules.responsive.order - a.modules.responsive.order;
		return diff || b.modules.responsive.index - a.modules.responsive.index;
	});

	this.columns = columns;

	if (this.mode === "collapse") {
		this.generateCollapsedContent();
	}

	//assign collapse column
	for (var _iterator = this.table.columnManager.columnsByIndex, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var _ref;

		if (_isArray) {
			if (_i >= _iterator.length) break;
			_ref = _iterator[_i++];
		} else {
			_i = _iterator.next();
			if (_i.done) break;
			_ref = _i.value;
		}

		var col = _ref;

		if (col.definition.formatter == "responsiveCollapse") {
			this.collapseHandleColumn = col;
			break;
		}
	}

	if (this.collapseHandleColumn) {
		if (this.hiddenColumns.length) {
			this.collapseHandleColumn.show();
		} else {
			this.collapseHandleColumn.hide();
		}
	}
};

//define layout information
ResponsiveLayout.prototype.initializeColumn = function (column) {
	var def = column.getDefinition();

	column.modules.responsive = { order: typeof def.responsive === "undefined" ? 1 : def.responsive, visible: def.visible === false ? false : true };
};

ResponsiveLayout.prototype.initializeRow = function (row) {
	var el;

	if (row.type !== "calc") {
		el = document.createElement("div");
		el.classList.add("tabulator-responsive-collapse");

		row.modules.responsiveLayout = {
			element: el,
			open: this.collapseStartOpen
		};

		if (!this.collapseStartOpen) {
			el.style.display = 'none';
		}
	}
};

ResponsiveLayout.prototype.layoutRow = function (row) {
	var rowEl = row.getElement();

	if (row.modules.responsiveLayout) {
		rowEl.appendChild(row.modules.responsiveLayout.element);
		this.generateCollapsedRowContent(row);
	}
};

//update column visibility
ResponsiveLayout.prototype.updateColumnVisibility = function (column, visible) {
	var index;
	if (column.modules.responsive) {
		column.modules.responsive.visible = visible;
		this.initialize();
	}
};

ResponsiveLayout.prototype.hideColumn = function (column) {
	var colCount = this.hiddenColumns.length;

	column.hide(false, true);

	if (this.mode === "collapse") {
		this.hiddenColumns.unshift(column);
		this.generateCollapsedContent();

		if (this.collapseHandleColumn && !colCount) {
			this.collapseHandleColumn.show();
		}
	}
};

ResponsiveLayout.prototype.showColumn = function (column) {
	var index;

	column.show(false, true);
	//set column width to prevent calculation loops on uninitialized columns
	column.setWidth(column.getWidth());

	if (this.mode === "collapse") {
		index = this.hiddenColumns.indexOf(column);

		if (index > -1) {
			this.hiddenColumns.splice(index, 1);
		}

		this.generateCollapsedContent();

		if (this.collapseHandleColumn && !this.hiddenColumns.length) {
			this.collapseHandleColumn.hide();
		}
	}
};

//redraw columns to fit space
ResponsiveLayout.prototype.update = function () {
	var self = this,
	    working = true;

	while (working) {

		var width = self.table.modules.layout.getMode() == "fitColumns" ? self.table.columnManager.getFlexBaseWidth() : self.table.columnManager.getWidth();

		var diff = (self.table.options.headerVisible ? self.table.columnManager.element.clientWidth : self.table.element.clientWidth) - width;

		if (diff < 0) {
			//table is too wide
			var column = self.columns[self.index];

			if (column) {
				self.hideColumn(column);
				self.index++;
			} else {
				working = false;
			}
		} else {

			//table has spare space
			var _column = self.columns[self.index - 1];

			if (_column) {
				if (diff > 0) {
					if (diff >= _column.getWidth()) {
						self.showColumn(_column);
						self.index--;
					} else {
						working = false;
					}
				} else {
					working = false;
				}
			} else {
				working = false;
			}
		}

		if (!self.table.rowManager.activeRowsCount) {
			self.table.rowManager.renderEmptyScroll();
		}
	}
};

ResponsiveLayout.prototype.generateCollapsedContent = function () {
	var self = this,
	    rows = this.table.rowManager.getDisplayRows();

	rows.forEach(function (row) {
		self.generateCollapsedRowContent(row);
	});
};

ResponsiveLayout.prototype.generateCollapsedRowContent = function (row) {
	var el, contents;

	if (row.modules.responsiveLayout) {
		el = row.modules.responsiveLayout.element;

		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}contents = this.collapseFormatter(this.generateCollapsedRowData(row));
		if (contents) {
			el.appendChild(contents);
		}
	}
};

ResponsiveLayout.prototype.generateCollapsedRowData = function (row) {
	var self = this,
	    data = row.getData(),
	    output = [],
	    mockCellComponent;

	this.hiddenColumns.forEach(function (column) {
		var value = column.getFieldValue(data);

		if (column.definition.title && column.field) {
			if (column.modules.format && self.table.options.responsiveLayoutCollapseUseFormatters) {

				mockCellComponent = {
					value: false,
					data: {},
					getValue: function getValue() {
						return value;
					},
					getData: function getData() {
						return data;
					},
					getElement: function getElement() {
						return document.createElement("div");
					},
					getRow: function getRow() {
						return row.getComponent();
					},
					getColumn: function getColumn() {
						return column.getComponent();
					}
				};

				output.push({
					field: column.field,
					title: column.definition.title,
					value: column.modules.format.formatter.call(self.table.modules.format, mockCellComponent, column.modules.format.params)
				});
			} else {
				output.push({
					field: column.field,
					title: column.definition.title,
					value: value
				});
			}
		}
	});

	return output;
};

ResponsiveLayout.prototype.formatCollapsedData = function (data) {
	var list = document.createElement("table");

	data.forEach(function (item) {
		var row = document.createElement("tr");
		var titleData = document.createElement("td");
		var valueData = document.createElement("td");
		var node_content;

		var titleHighlight = document.createElement("strong");
		titleData.appendChild(titleHighlight);
		this.table.modules.localize.bind("columns|" + item.field, function (text) {
			titleHighlight.innerText = text || item.title;
		});

		if (item.value instanceof Node) {
			node_content = document.createElement("div");
			node_content.appendChild(item.value);
			valueData.appendChild(node_content);
		} else {
			valueData.innerHTML = item.value;
		}

		row.appendChild(titleData);
		row.appendChild(valueData);
		list.appendChild(row);
	}, this);

	return Object.keys(data).length ? list : "";
};

Tabulator.prototype.registerModule("responsiveLayout", ResponsiveLayout);