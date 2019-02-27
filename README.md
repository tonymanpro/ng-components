
## Use clickOutside

- libClickoutside: is the directive to invoke
- clickoutside is the directive event (Output)
- enableClass is the class that not be afected this event

Example:

```html
<button libClickoutside (clickoutside)='myEvent($event)' enableClass='myExceptedClass'></button>
```


## Use the serviceBase

* Using the service base, go to you project and add in you service management this current code,
when

- apiArray is a array of invokation API's [{name: '', url: ''}]
- bearerToken is used if your API use authentication
- lang is the culture used to management error

* Entend your service class from 'NgComponentsService'


```javascript
  protected abstract apiArray: any[];
  protected abstract bearerToken: string;
  protected abstract lang: string;

  constructor(
    http: HttpClient,
    router: Router
  ) {
    super(http, router);
  }
```

# Management error

* Be default all the error status 401 return to the path logout with the parameters isSesionExpired in true:
```javascript
    this.router.navigate(['logout'], { queryParams: { isSesionExpired: true } })
```

* The NgComponentsService need in the assets a file called error.json:
 Example:

```javascript
{
    "en": [
        { 
          "code": 400, "message": "So sorry a error has been detected" 
        },
        { 
          "code": 404, "message": "Not Found this recurse" 
        },
        { "code": 403, "message": {
                "type": "handler",
                "path": "message"
            } 
        },
        {
          "code": -1, "message": "Timeout message"
        },
        { 
          "code": -2, "message": "Offline message"
        },
        {
          "code": 0,"message": "Default message"
        }
    ]
}

```
* You need specficate the lang of the error handled error message, in this example english ´en´
* If you use a code error in the message property has type handler, you need provide a message path
* You can use error code 0, -1, -2 for specific parametriced errors


## Custome error response

Be defaul the framework use you error.json to catch each error response, but sometimes we need a 
custom error management of the message.

In this case you only need create a method in your class called errorReponse
Example:

```javascript
errorReponse(error: HttpErrorResponse) // Declare HttpErrorResponse is not necesary
{
  return error.message;
}
```


## Validate navigation router

* To validate the navigation between our site is necesario management a scope of permisions and add in the routerMap the sentence canActive and canActiveChild.
Example:

```javascript
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermisionComponent],
    children: [
      {
        path: '',
        canActivateChild: [ PermisionComponent ],
        children: [
          { path: 'detail', component: DetailComponent },
          { path: 'edit', component: EditComponent }
        ]
      }
    ]
  }
];
```


This PermisionComponent validate based in the scope of permision that need be created in the app.component.ts with the localstorage name PERMISSION

Example:

```javascript
 localStorage.setItem('PERMISSION', '["/", "/dashboard", "/dashboard/agregar"]');
```


## Management permision by component or tag

* We can use the attribute libPermision, action, isValid in each component or html tag to validate the previos array of PERMISION
- libPermision is the attribute that indicate that this element will be validated
- action represent the attribute with value of a action to be execute example action="submit"  or action="addNewElement"
- isValid is a boolean that indicate if this be previos validated with a function too

Example:

```html
<script>
  function validateSubmit(){
    return true;
  }
</script>

<button libPermision action="addItem" isValid="validateSubmit()">Send to aproved</button>
```