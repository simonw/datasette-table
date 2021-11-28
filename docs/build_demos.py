import pathlib
import re
import subprocess


index_re = re.compile(r"<!\-\- list-starts \-\->.*?<!\-\- list-ends \-\->", re.DOTALL)

dir = pathlib.Path(__file__).parent


def get_tags():
    output = subprocess.check_output(["git", "tag"]).decode("utf-8")
    tags = [l.strip() for l in output.split("\n") if l.strip()]
    tags.sort(key=lambda t: tuple(map(int, t.split("."))), reverse=True)
    return tags


def build_list(tags):
    lines = ["<!-- list-starts -->"]
    lines.extend(
        '<li><a href="{tag}.html">{tag}</a></li>'.format(tag=tag) for tag in tags
    )
    lines.append("<!-- list-ends -->")
    return "\n".join(lines)


if __name__ == "__main__":
    tags = get_tags()
    index = dir / "index.html"
    index_contents = index.open().read()
    rewritten = index_re.sub(build_list(tags), index_contents)
    index.write_text(rewritten, "utf-8")
    # Write out a file per version
    template = (dir / "_template.html").read_text()
    for tag in tags:
        content = template.replace("{version}", tag)
        version_file = dir / "{}.html".format(tag)
        version_file.write_text(content, "utf-8")
