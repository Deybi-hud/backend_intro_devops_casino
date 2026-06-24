# Casino Backend

Backend Principal (Node.js) de la plataforma VidalCasino.

## Arquitectura y Despliegue en Amazon EKS (EP3)

Este servicio ha sido migrado a una arquitectura nativa de la nube en Kubernetes y comparte la base de datos PostgreSQL de forma segura mediante secretos.

### Workflow de CI/CD Paso a Paso
El despliegue de esta aplicación está automatizado mediante GitHub Actions (`.github/workflows/deploy.yaml`).

1. **Commit y Push**: Al realizar un push a la rama `deploy`, se activa el pipeline.
2. **Build Docker**: GitHub Actions lee el `Dockerfile` optimizado (multi-stage, con ejecución de usuario `node` no root) y construye la imagen.
3. **Push a Amazon ECR**: La imagen se publica de forma privada en ECR etiquetada con el SHA del commit para un versionado preciso.
4. **Deploy a Amazon EKS**: El pipeline se conecta de forma segura al clúster y actualiza el Deployment en Kubernetes usando la nueva imagen garantizando Zero Downtime.

### Componentes de Kubernetes (Carpeta `k8s/`)
- **Base de Datos y Secretos**: Este repositorio centraliza los manifiestos de la base de datos PostgreSQL compartida (`postgres-deployment.yaml`, `postgres-service.yaml`) y el secreto con todas las credenciales (`casino-secrets.yaml`).
- **Deployment (Backend)**: Configura el contenedor, inyecta el `casino-secrets` y establece las pruebas de salud hacia `/livez`.
- **Service**: Permite la conexión interna entre el frontend y el backend mediante un `ClusterIP`.

### Secretos de GitHub Requeridos
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`, `AWS_REGION`, `EKS_CLUSTER`, `ECR_REPOSITORY`, `DEPLOYMENT_NAME`, `CONTAINER_NAME`.
