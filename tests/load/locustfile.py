from locust import HttpUser, task, between

class CasinoStressUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def ver_pagina_principal(self):
        self.client.get("/")

    @task(2)
    def consultar_juegos(self):
        self.client.get("/api/juegos")

    @task(1)
    def verificar_salud(self):
        self.client.get("/readyz")