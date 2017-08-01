import os
import docker
import shutil
import uuid

from docker.errors import APIError, ContainerError, ImageNotFound

client = docker.from_env()

IMAGE_NAME = 'yangyang729729/cs503-oj'
CURRENT_DIR = os.path.dirname(os.path.relpath(__file__))
TEMP_BUILD_DIR = '%s/tmp' % CURRENT_DIR


SOURCE_FILE_NAMES = {
    'java':'Example.java',
    'pyhton':'example.py'
}

BINARY_NAMES = {
    'java': 'Example',
    'python': 'example.py'
}

BUILD_COMMANDS = {
    'java':'javac',
    'pyhton':'python'
}

EXCUTE_COMMANDS = {
    'java':'java',
    'python':'python'
}



def load_image():
    try:
        client.images.get(IMAGE_NAME)
        print('image already exists')
    except ImageNotFound:
        print('image not found, pulling from docker hub')
        client.images.pull(IMAGE_NAME)
    except APIError:
        print('APIError')
        return
    print('image loaded')


def make_dir(dir):
    try:
        os.mkdir(dir)
        print(('temp build dir %s creates') % dir)
    except OSError:
        print(('temp buikld dir %s exists') % dir)


def build_and_run(code,lang):
    result = {'build':'nothing','run':'nothing'}
    source_file_parent_dir_name = uuid.uuid4()
    source_file_host_dir = '%s/%s' % (TEMP_BUILD_DIR,source_file_parent_dir_name)
    
    source_file_guest_dir = '/test/%s' % source_file_parent_dir_name

    make_dir(source_file_host_dir)

    #write code files
    # '/tmp/d7b58e21-33fe-49e4-90c4-e709458f020e/Example.java'
    with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[lang]),'w') as f:
        f.write(code)

    #build scripts inside docker
    try:
        client.containers.run(
            image=IMAGE_NAME,
            command='%s %s' % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
            volumes={source_file_host_dir: {'bind':source_file_guest_dir, 'mode':'rw'}},
            working_dir=source_file_guest_dir
        )
        print('source built')
        result['build'] = 'ok'
    except ContainerError as e:
        print('build failed')
        result['build'] = e.stderr.decode('utf-8')
        shutil.rmtree(source_file_host_dir)
        print(result)
        return result

    #run scripts inside docker
    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command='%s %s' % (EXCUTE_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes={source_file_host_dir: {'bind':source_file_guest_dir, 'mode':'rw'}},
            working_dir=source_file_guest_dir
        )

        print('executed')
        result['run'] = log.decode('utf-8')

    except ContainerError as e:
        print('execution failed')
        result['run'] = e.stderr.decode('utf-8')
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result
