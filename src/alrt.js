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
        options.duration = options.duration || this.opt.duration
        options.theme = this.opt.theme || "alrt-default-light"
        options.position = this.position;

        if (this.opt.behavior == "overwrite") {
            if (this.previousLog) {
                if (!this.previousLog.isDestroyed) {
                    this.previousLog.destroyNoTransition()
                    this.previousLog = new AlrtLog(text, options, true);
                    return
                }
            }
        }
        this.previousLog = new AlrtLog(text, options);
    }
}

class AlrtLog {
    constructor(text, opt, noTransition) {
        this.isDestroyed = false;
        if (!opt) {
            this.opt = {
                subtext: false,
                closeBtn: false,
                hoverPause: false,
                theme: "alrt-default-light",
                duration: 2000,
                displayProgress: false,
                buttons: null,
                position: "bottom-left",
                icon: null
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
                position: opt.position || "bottom-left",
                icon: opt.icon || null
            };
        }
        this.node = document.createElement("div");
        this.title = document.createElement("p");
        this.title.innerHTML = (opt.icon ? `<i class="${opt.icon}"></i>` : "") + text;
        this.node.appendChild(this.title);
        this.node.classList.add("alrt-wrap");
        if (noTransition) {
            this.node.style.animationName = "none"
        }
        this.node.setAttribute("data-theme", this.opt.theme)
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

        /*
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
        }*/

        setTimeout(() => {
            this.destroy();
        }, this.opt.duration);
    }

    destroy(e, self) {
        this.isDestroyed = true;
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
    destroyNoTransition(e, self) {
        this.isDestroyed = true;
        if (this) self = this;
        if (self.node.parentNode) self.node.parentNode.removeChild(self.node);
    }
}