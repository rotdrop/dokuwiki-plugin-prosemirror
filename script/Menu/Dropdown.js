const { MenuItem } = require('./MenuItem');

class Dropdown extends MenuItem {
    constructor(content, options) {
        console.log('constructing Dropdown');
        console.log(options);
        super({
            command: () => true,
            render: view => this.renderIcon(view, options),
        });
        this.content = Array.isArray(content) ? content : [content];
    }

    renderIcon(editorView, options) {
        console.log('rendering Dropdown Icon');
        const $menuItemContainer = jQuery('<span>').addClass('dropdown');
        const $dropdownLabel = jQuery('<span>').text(options.label).addClass('menuitem menulabel');
        $menuItemContainer.append($dropdownLabel);

        jQuery($dropdownLabel).on('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.open) {
                this.open = false;
                this.hideContent();
            } else {
                this.open = true;
                this.showContent();
            }
        });

        this.renderDropdownItems(editorView, $menuItemContainer);
        this.hideContent();

        return $menuItemContainer.get(0);
    }

    showContent() {
        // TODO: add listener to close it by clicking anywhere else
        this.contentDom.style.display = 'block';
    }

    hideContent() {
        this.contentDom.style.display = 'none';
    }


    renderDropdownItems(editorView, $menuItemContainer) {
        this.contentDom = document.createElement('div');
        this.contentDom.className = 'dropdown_content';
        this.content.forEach((item) => {
            const itemDom = item.render(editorView);
            this.contentDom.appendChild(itemDom);
        });
        $menuItemContainer.append(this.contentDom);
    }

    update(editorView) {
        if (!this.open) {
            return;
        }
        this.content.forEach((item) => {
            item.update(editorView);
        });
    }
}

exports.Dropdown = Dropdown;
