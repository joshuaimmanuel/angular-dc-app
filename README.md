# Angular Application using dc.js

## Build instructions for GNU/Linux (Debian)

* Install the system package python3-venv (if not already installed)

    ```shell
    $ sudo apt-get install python3-venv
    ```
* Create a Python virtual environment.

    ```shell
    $ python3 -m venv env
    ```

* Activate the virtual environment

    ```shell
    $ source env/bin/activate
    ```

* Upgrade packaging tools.

    ```shell
    (env) $ pip install --upgrade pip setuptools
    ```

* Install python wheel package

    ```shell
    (env) $ pip install wheel
    ```
* Install the nodeenv package for python inside the virtual environment

    ```shell
    (env) $ pip install nodeenv
    ```
* Use the current virtual environment for nodeenv

    ```shell
    (env) $ nodeenv -p
    ```

* Install [Angular CLI](https://cli.angular.io/) inside the virtual environment

    ```shell
    (env) $ npm install -g @angular/cli
    ```

* Install npm packages required by the client application

    ```shell
    (env) $ npm install
    ```

* Serve the angular application

    ```shell
    (env) $ ng serve
    ```

> Now we can navigate to `http://localhost:4200/` in order to view the
> application on the browser

Happy Hacking :)
