# Apache Kafka

Apache dağıtık mesajlaşma sistemidir.

- Hızlı
- Yüksek ölçeklendirilebilir
- Sırası olan
- İçeriği değiştirilemez.
- Dirençli bir mekanizmaya sahiptir.

Kafka 4 ana yapıdan oluşmaktadır.Bunlar ;

1.)BROKER
2.)ZOOKEEPER
3.)PRODUCER
4.)CONSUMER

Node ve Partition ile yatay olarak ölçeklendirilebilir ve verilerin birden çok sunucuya dağıtılmasına izin vererek, tek bir sunucuya sığacak boyutun ötesinde ölçeklenebilir hale getirir.
Mesajlar disk üzerine immutable log ile yazılıyor. Bunun anlamı bir mesajı yazdığınız zaman bu mesaj değiştirilemez.Bunu sadece apache kafka yapabilir bu sebeple veri kaybı neredeyse yok yani 0 dır.
Bir kafka cluster’ı içerisinde 1000 adet broker olsa bile bu geçerlidir fakat her broker sadece belirli topic partitionlarını barındırır. Siz bir broker’a bağlandığınızda tüm cluster’a erişmiş olursunuz ama bağlandığınız broker tüm veriyi tutmaz. Buna dağıtık(distrubuted) mimari denir ve kafka dağıtık yapıdadır. Bu duruma replikasyon (kopyalama) denir.
Kafka genellikle büyük ölçekli mesajlaşma uygulamalarında veya streaming uygulamalarında kullanılır.
Streaming uygulamalarında tercih edilmesinin sebebi mesajların kaybolmaması, persistent olarak saklanmasıdır.
Kafka, bölümlerin farklı sunucular arasında dağıtılmasına izin vererek ölçeklenebilirlik sağlar.
Tek bir protokol kullanılıyor.(Native Kafka Protocol)

# Apache Kafka Kurulum komutları

$wget -O- https://apt.corretto.aws/corretto.key | sudo apt-key add - 
$sudo add-apt-repository 'deb https://apt.corretto.aws stable main'
$sudo apt-get update; sudo apt-get install -y java-11-amazon-corretto-jdk
$wget https://archive.apache.org/dist/kafka/3.0.0/kafka_2.13-3.0.0.tgz
$tar xzf kafka_2.13-3.0.0.tgz
$mv kafka_2.13-3.0.0 ~
$~/kafka_2.13-3.0.0/bin/zookeeper-server-start.sh ~/kafka_2.13-3.0.0/config/zookeeper.properties
$~/kafka_2.13-3.0.0/bin/kafka-server-start.sh ~/kafka_2.13-3.0.0/config/server.properties

## Projeyi Çalıştırabilmek için

docker-compose.yaml yazıyoruz.
$docker-compose up
Yeni bash açıp
$docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
--create \
--zookeeper zookeeper:2181 \
--replication-factor 1 \
--partitions 1 \
--topic test
Yukarıdakini yazdıktan sonra terminal _created topic test_ dönüşünü yapacak.
Daha sonra $npm init -y 
$npm install node-rdkafka@2.10.1
$npm install avsc
Çalışan portların kontrolü için $nestat -tulpn

**Apache Kafkaye giden ve gelen mesajları görebilip projeyi aktif edebilmek için**
3 adet terminal açıyoruz sırayla  
1.**$docker-compose up** 2.**$npm run start:producer** 3.**$npm run start:consumer**
