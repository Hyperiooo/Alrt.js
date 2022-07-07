class Alrt {
    constructor(opt) {
        this.opt = opt;
        this.position = opt.position || "bottom-left";
        this.zIndex = opt.zIndex || 2147483647;
        this.parentEl = document.createElement("div");
        this.mainName = "alrt-main-" + (randomString(5))
        this.parentEl.id = this.mainName;
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
                    this.previousLog = new AlrtLog(text, options, this.mainName, true);
                    return
                }
            }
        }
        this.previousLog = new AlrtLog(text, options, this.mainName);
    }
}

var randomString = function(l, charset) { // generates string of x length, if charset is passed override
    var result = '';
    var characters = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < l; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

class AlrtLog {
    constructor(text, opt, mainName, noTransition) {
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
                .getElementById(mainName)
                .insertBefore(
                    this.node,
                    document.getElementById(mainName).firstChild
                );
        } else if (this.opt.position.startsWith("top")) {
            document.getElementById(mainName).appendChild(this.node);
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
