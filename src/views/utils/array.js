var _menu = this.dataSource;
var len = _menu.length;
for (var i = 0; i < len; i++) {
    var item = _menu[i];

    if (item.children && item.children.length != 0) {
        var children = item.children;
        for (var j = 0; j < children.length; j++) {
            _menu[len + j] = children[j];
        }
        len = _menu.length;
    }
    this.menuId.push(item);
    console.log(this.menuId)
}