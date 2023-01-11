import json
import os
import shutil
from scripts.font_manager import tag, cyan, green


def migrate_builds(path):
    print(tag("MIGRATION"), cyan("Migrating builds..."))

    if os.path.exists(path + "contract_builds"):
        shutil.rmtree(path + "contract_builds")
    shutil.copytree(
        "./build",
        path + "contract_builds",
    )
    print(tag("MIGRATION"), green("Done!"))


def main():
    path = "client/src/"

    migrate_builds(path)
