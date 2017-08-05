import executor_utils as eu
from flask import Flask, jsonify, request
import json
app = Flask(__name__)

@app.route('/')
def hello():
    return 'hello world'

@app.route('/build_and_run', methods=['POST'])
def build_and_run():
    data = json.loads(request.data.decode('utf-8'))
    if 'code' not in data or 'lang' not in data:
        return 'you should provide both code and lang'
    code = data['code']
    lang = data['lang']
    print('API got called with code %s in %s)' % (code, lang))
    result = eu.build_and_run(code,lang)
    return jsonify(result)


if __name__ == '__main__':
    import sys
    eu.load_image()
    app.run(host='0.0.0.0',port=sys.argv[1])
