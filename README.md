
# pulumi_k8s_demo

Demo de Pulumi para kubernetes con GCP y GKE

```sh
pulumi version
```

```console
v2.2.1
```

## Requerimientos

* Acceso a GCP y cuenta de servicio con privilegios (archivo json con las credenciales)
* GCP project donde se tengan privilegios para GKE.
* NodeJS.
* Pulumi CLI ([pulumi](https://www.pulumi.com/docs/reference/cli/)).

```sh
pulumi new -d "k8s cluster using typescript" --dir pulumi_k8s_demo typescript -y -s develop

Nota: no hace falta realizarlo ya que el repositorio tiene el contenido.
```

Crear el stack.

```sh
pulumi stack init develop
```

Instalar las dependencias para kubernetes.

```sh
cd pulumi_k8s_demo
npm install --save @pulumi/pulumi @pulumi/gcp @pulumi/kubernetes @types/chai @types/mocha chai mocha
```

Definir los valores de configuracion para GCP.

```sh
pulumi config set gcp:project YOURPROJECT
pulumi config set gcp:zone YOURZONE
pulumi config set region YOURREGION
pulumi config set domain YOURDOMAIN
pulumi config set subdomain YOURSUBDOMAIN
pulumi config set nodes YOURNODESCOUNT
pulumi config set ipcidrrange YOURIPRANGE
```

Definir las credencias en variable de ambiente para pulumi.

```sh
export GOOGLE_APPLICATION_CREDENTIALS="/Users/everis/gcloud/gcp-service-account.json"
```

Realizar el preview del despliegue.

```sh
pulumi preview
```

Realizar el despliegue.

```sh
pulumi up -y
```

Obtener las credenciales del cluster.

```sh
pulumi stack output KUBECONFIG --show-secrets > /tmp/kubeconfig
```

Obtener el password del usuario admin de grafana.

```sh
kubectl --kubeconfig=/tmp/kubeconfig get secret \
    --namespace default grafana \
    -o jsonpath="{.data.admin-password}" \
    | base64 --decode ; echo
```

Abrir un navegador y comprobar que se puede ingresar en grafana.

```console
http://subdomain.domain/login
```
