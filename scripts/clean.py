import shutil


def clean_build(directory):
    shutil.rmtree(directory)


def main():
    clean_build("./build")


if __name__ == "__main__":
    main()
