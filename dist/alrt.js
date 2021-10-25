class Alrt {
    constructor(opt) {
        this.opt = opt;
        this.position = opt.position || "bottom-left";
        this.zIndex = opt.zIndex || 2147483647;
        this.parentEl = document.createElement("div");
        this.parentEl.id = "alrt-main";
        this.parentEl.classList.add("alrt-" + opt.position);
        document.body.appendChild(this.parentEl);
    }
    log(text, opt) {
        var options = opt || {};
        options.position = this.position;
        new AlrtLog(text, options);
    }
}

class AlrtLog {
    constructor(text, opt) {
        if (!opt) {
            this.opt = {
                subtext: false,
                closeBtn: false,
                hoverPause: false,
                theme: "alrt-default-light",
                duration: 2000,
                displayProgress: false,
                buttons: null,
                position: "bottom-left"
            };
        } else {
            this.opt = {
                subtext: opt.subtext || false,
                closeBtn: opt.closeBtn || false,
                hoverPause: opt.hoverPause || false,
                theme: opt.theme || "alrt-default-light",
                duration: opt.duration || 2000,
                displayProgress: opt.displayProgress || false,
                buttons: opt.buttons || null,
                position: opt.position || "bottom-left"
            };
        }
        this.node = document.createElement("div");
        this.title = document.createElement("p");
        this.title.innerHTML = text;
        this.node.appendChild(this.title);
        this.node.classList.add("alrt-wrap");
        this.node.classList.add(this.opt.theme);
        self = this;
        if (this.opt.position.startsWith("bottom")) {
            document
                .getElementById("alrt-main")
                .insertBefore(
                    this.node,
                    document.getElementById("alrt-main").firstChild
                );
        } else if (this.opt.position.startsWith("top")) {
            document.getElementById("alrt-main").appendChild(this.node);
        }

        var btnParent = document.createElement("div");
        btnParent.classList.add("alrt-btn-parent");
        this.node.appendChild(btnParent);

        if (this.opt.closeBtn) {
            var closeBtn = document.createElement("button");
            closeBtn.onclick = (e) => {
                this.destroy(e, self);
            };
            closeBtn.classList.add("alrt-close-button");
            closeBtn.innerHTML = '<i class="ri-close-line"></i>';
            btnParent.appendChild(closeBtn);
        }

        setTimeout(() => {
            this.destroy();
        }, this.opt.duration);
    }

    destroy(e, self) {
        if (this) self = this;
        if (self.opt.position.startsWith("top")) {
            self.node.classList.add("alrt-top-out");
        } else if (self.opt.position.startsWith("bottom")) {
            self.node.classList.add("alrt-bottom-out");
        }
        setTimeout(() => {
            if (self.node.parentNode) self.node.parentNode.removeChild(self.node);
        }, 400);
    }
}