from backend.apps.main.models import User, Photo, Org, Event, Post, FollowerToOrg, UserToOrg, PostToOrg, PostToUser, PhotoToOrg, PhotoToUser, \
    PhotoToPost, EventToPost, UserToPost, OrgToPost, PhotoToEvent, EventToOrg, OfficerToOrg
from rest_framework import serializers


# https://docs.djangoproject.com/en/1.11/ref/contrib/auth/  <-- info about django User model
class UserSerializer(serializers.ModelSerializer):
    class_standing = serializers.CharField(source='member.class_standing')
    join_date = serializers.DateTimeField(source='member.join_date')

    class Meta:
        model = User
        # fields = ('id', 'class_standing', 'join_date',)
        fields = ('id', 'username', 'first_name', 'class_standing', 'join_date')


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'name', 'image')


class OrgSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='org.name')
    join_date = serializers.DateTimeField(source='org.join_date')
    description = serializers.CharField(source='org.description')

    class Meta:
        model = Org
        fields = ('id', 'name', 'join_date', 'description')


class EventSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='event.name')
    event_date = serializers.DateTimeField(source='event.event_date')
    access_level = serializers.CharField(source='event.access_level')
    location = serializers.CharField(source='event.location')
    description = serializers.CharField(source='event.description')

    class Meta:
        model = Event
        fields = ('id', 'name', 'event_date', 'access_level', 'location', 'description')


class PostSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='post.name')
    created_date = serializers.DateTimeField(source='post.created_date')
    description = serializers.CharField(source='post.description')

    class Meta:
        model = Post
        fields = ('id', 'name', 'created_date', 'description')


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        write_only_fields = ('password',)


class FollowerToOrgSerializer(serializers.ModelSerializer):
    follower = UserSerializer
    orgs = OrgSerializer(many=True)

    class Meta:
        model = FollowerToOrg
        fields = ('follower', 'orgs')


class UserToOrgSerializer(serializers.ModelSerializer):
    user = UserSerializer
    orgs = OrgSerializer(many=True)

    class Meta:
        model = UserToOrg
        fields = ('user', 'orgs')


class PostToOrgSerializer(serializers.ModelSerializer):
    org = OrgSerializer
    posts = PostSerializer(many=True)

    class Meta:
        model = PostToOrg
        fields = ('org', 'posts')


class PostToUserSerializer(serializers.ModelSerializer):
    user = UserSerializer
    posts = PostSerializer(many=True)

    class Meta:
        model = PostToUser
        fields = ('user', 'posts')


class PhotoToOrgSerializer(serializers.ModelSerializer):
    org = OrgSerializer
    photos = PhotoSerializer(many=True)

    class Meta:
        model = PhotoToOrg
        fields = ('org', 'photos')


class PhotoToUserSerializer(serializers.ModelSerializer):
    user = UserSerializer
    photos = PhotoSerializer(many=True)

    class Meta:
        model = PhotoToUser
        fields = ('user', 'photos')


class PhotoToPostSerializer(serializers.ModelSerializer):
    post = PostSerializer
    photos = PhotoSerializer(many=True)

    class Meta:
        model = PhotoToPost
        fields = ('post', 'photos')


class EventToPostSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    event = EventSerializer

    class Meta:
        model = EventToPost
        fields = ('event', 'posts')


class UserToPostSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    user = UserSerializer

    class Meta:
        model = UserToPost
        fields = ('user', 'posts')


class OrgToPostSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True)
    org = OrgSerializer

    class Meta:
        model = OrgToPost
        fields = ('org', 'posts')


class PhotoToEventSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True)
    event = EventSerializer

    class Meta:
        model = PhotoToEvent
        fields = ('event', 'photos')


class EventToOrgSerializer(serializers.ModelSerializer):
    event = EventSerializer
    org = OrgSerializer

    class Meta:
        model = EventToOrg
        fields = ('org', 'event', 'created_date')


class OfficerToOrgSerializer(serializers.ModelSerializer):
    officer = UserSerializer
    org = OrgSerializer

    class Meta:
        model = OfficerToOrg
        fields = ('officer', 'org', 'join_dated')
