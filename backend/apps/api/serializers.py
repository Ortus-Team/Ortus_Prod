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
        fields = ('id', 'owner', 'image')


class OrgSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    join_date = serializers.DateTimeField()
    description = serializers.CharField()

    class Meta:
        model = Org
        fields = ('id', 'name', 'join_date', 'description')


class EventSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    event_date = serializers.DateTimeField()
    access_level = serializers.CharField()
    location = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = Event
        fields = ('id', 'name', 'event_date', 'access_level', 'location', 'description')


class PostSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    created_date = serializers.DateTimeField()
    description = serializers.CharField()

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
    org = OrgSerializer

    class Meta:
        model = FollowerToOrg
        fields = ('follower', 'org')


class UserToOrgSerializer(serializers.ModelSerializer):
    user = UserSerializer
    org = OrgSerializer

    class Meta:
        model = UserToOrg
        fields = ('user', 'org')


class PostToOrgSerializer(serializers.ModelSerializer):
    org = OrgSerializer
    post = PostSerializer

    class Meta:
        model = PostToOrg
        fields = ('org', 'post')


class PostToUserSerializer(serializers.ModelSerializer):
    user = UserSerializer
    post = PostSerializer

    class Meta:
        model = PostToUser
        fields = ('user', 'post')


class PhotoToOrgSerializer(serializers.ModelSerializer):
    org = OrgSerializer
    photo = PhotoSerializer

    class Meta:
        model = PhotoToOrg
        fields = ('org', 'photo')


class PhotoToUserSerializer(serializers.ModelSerializer):
    user = UserSerializer
    photo = PhotoSerializer

    class Meta:
        model = PhotoToUser
        fields = ('user', 'photo')


class PhotoToPostSerializer(serializers.ModelSerializer):
    post = PostSerializer
    photo = PhotoSerializer

    class Meta:
        model = PhotoToPost
        fields = ('post', 'photo')


class EventToPostSerializer(serializers.ModelSerializer):
    post = PostSerializer
    event = EventSerializer

    class Meta:
        model = EventToPost
        fields = ('event', 'post')


class UserToPostSerializer(serializers.ModelSerializer):
    post = PostSerializer
    user = UserSerializer

    class Meta:
        model = UserToPost
        fields = ('user', 'post')


class OrgToPostSerializer(serializers.ModelSerializer):
    post = PostSerializer
    org = OrgSerializer

    class Meta:
        model = OrgToPost
        fields = ('org', 'post')


class PhotoToEventSerializer(serializers.ModelSerializer):
    photo = PhotoSerializer
    event = EventSerializer

    class Meta:
        model = PhotoToEvent
        fields = ('event', 'photo')


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
