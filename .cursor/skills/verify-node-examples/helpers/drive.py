#!/usr/bin/env python3
import argparse,datetime,json,pathlib,re,select,shutil,subprocess,urllib.request
root=pathlib.Path(__file__).resolve().parents[4]
a=argparse.ArgumentParser();a.add_argument('mode',choices=['doctor','drive']);a.add_argument('--out',default='.verification-evidence');args=a.parse_args();out=pathlib.Path(args.out).resolve();out.mkdir(parents=True,exist_ok=True)
r={'mode':args.mode,'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'ok':False,'steps':[]};p=None
try:
 assert shutil.which('node'),'node required';src=root/'http_server/server.js';assert src.is_file(),'Wrong repo'
 v=subprocess.run(['node','--version'],capture_output=True,text=True,check=True,timeout=5);r['node']=v.stdout.strip()
 subprocess.run(['node','--check',str(src)],capture_output=True,text=True,check=True,timeout=5)
 if args.mode=='drive':
  for bad in ['nope','65536','-1']:
   q=subprocess.run(['node',str(src),bad],capture_output=True,text=True,timeout=5);assert q.returncode==1 and 'Port must be' in q.stderr;r['steps'].append({'invalid_port':bad,'exit':q.returncode,'stderr':q.stderr})
  p=subprocess.Popen(['node',str(src),'0'],cwd=src.parent,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
  assert select.select([p.stdout],[],[],5)[0],'No ready log';line=p.stdout.readline().strip();m=re.fullmatch(r'Server listening on (\d+)',line);assert m,line;port=int(m[1]);assert port>0
  for path in ['/','/repeat','/?x=1']:
   with urllib.request.urlopen(f'http://127.0.0.1:{port}'+path,timeout=3) as res:
    body=res.read().decode();assert res.status==200 and res.headers.get_content_type()=='text/plain' and body=='Hello from HTTP server\n';r['steps'].append({'path':path,'status':res.status,'body':body,'port':port})
 r['ok']=True
except Exception as e:r['failure']=str(e)
finally:
 if p:
  p.terminate()
  try:p.wait(timeout=5)
  except subprocess.TimeoutExpired:p.kill();p.wait(timeout=5)
  r['child_reaped']=p.poll() is not None
(out/(args.mode+'.json')).write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r,indent=2));raise SystemExit(0 if r['ok'] else 1)
