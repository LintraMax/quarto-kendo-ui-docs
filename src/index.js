const WAYBACK_ROOT = "https://web.archive.org/web/20170622*/https://docs.telerik.com/kendo-ui/";
const GITHUB_ROOT = "https://github.com/telerik/kendo-ui-core/tree/2017.2.621/docs/"
const TELERIK_ROOT = "https://docs.telerik.com/kendo-ui/"

function renderTree(directories, parent, paths = []) {
    _.map(directories, directory => {
        const thisPaths = _.concat(paths, [ directory.path ]);
        const hasChildren = _.size(directory.items) > 0;
        const isUI = _.indexOf(thisPaths, "ui") > -1;
        const title = directory.text;

        if (hasChildren) {
            parent.append($(`<div>${ title }</div>`));
        } else {
            const waybackPath = _.replace(WAYBACK_ROOT + _.join(thisPaths, "/"), ".html", "");
            const githubPath = _.replace(GITHUB_ROOT + _.join(thisPaths, "/"), ".html", ".md");
            const telerikPath = _.replace(TELERIK_ROOT + _.join(thisPaths, "/"), ".html", "");
            const content = $(`<div>
                <span title="${ isUI ? "Kendo UI Component" : "" }" style="cursor:default">
                    ${ isUI ? "&#128241;" : "&#183;" }
                </span>
                <span style="margin-left:.1em;">${ title }</span>
                <span style="margin-left:.5em;">
                    <a title="Wayback Machine - ${ title }" href="${ waybackPath }">wb</a>
                </span>
                <span style="margin-left:.5em;">
                    <a title="GitHub - ${ title }" href="${ githubPath }">gh</a>
                </span>
                <span style="margin-left:.5em;">
                    <a title="Telerik Latest - ${ title }" href="${ telerikPath }">.</a>
                </span>
            </div>`)
            parent.append(content);
        }

        if (hasChildren) {
            const child = $("<div style='margin-left:1.5em;'></div>")
            parent.append(child);
            renderTree(directory.items, child, thisPaths);
        }
    });
}

$(document).ready(function () {
    renderTree(DIRECTORIES, $("#doc"));
});
