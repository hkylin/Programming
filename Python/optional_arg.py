def myfunc(a,b, *args, **kwargs):
      c = kwargs.get('c', None)
      d = kwargs.get('d', None)
      #etc
myfunc('a','b', c='nick', d='dog')

