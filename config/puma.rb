# Puma configuration for Render's free tier
threads_count = ENV.fetch("RAILS_MAX_THREADS", 5)  # Máximo de 5 threads
threads threads_count, threads_count

# Define o número de workers (1 para a versão gratuita do Render)
workers ENV.fetch("WEB_CONCURRENCY", 1)  # Usar 1 worker

# Define a porta que Puma vai escutar. O Render define automaticamente a variável PORT.
port ENV.fetch("PORT", 3000)

# Permite reiniciar o servidor com o comando `bin/rails restart`.
plugin :tmp_restart

# Se estiver usando o Solid Queue, habilite este plugin.
plugin :solid_queue if ENV["SOLID_QUEUE_IN_PUMA"]

# Define o arquivo PID
pidfile ENV["PIDFILE"] if ENV["PIDFILE"]
