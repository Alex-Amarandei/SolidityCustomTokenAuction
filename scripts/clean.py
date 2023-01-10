import shutil


def clean_build(directory):
    shutil.rmtree(directory)


if __name__ == "__main__":
    clean_build("./build")
